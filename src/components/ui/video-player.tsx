import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * VideoPlayer — player com chrome próprio (play/pause, seek, ±10s, volume,
 * fullscreen, atalhos de teclado) no branding IAplicada, tocando um vídeo
 * do YouTube via IFrame Player API.
 *
 * Por que não <video src>? O YouTube não expõe MP4 direto — o único jeito
 * suportado de tocar é o iframe. Aqui o iframe roda com controls=0 e a
 * gente desenha os controles por cima, com um overlay transparente que
 * captura os cliques (o iframe engole pointer events).
 */

const videoPlayerVariants = cva(
  "iap-video relative w-full bg-black overflow-hidden group outline-none",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  unloadModule(module: string): void;
  destroy(): void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3 };
}

type YTWindow = Window & {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
};

let ytApiPromise: Promise<YTNamespace> | null = null;

/** Carrega a IFrame API uma única vez (singleton) e resolve com window.YT. */
function loadYouTubeApi(): Promise<YTNamespace> {
  const w = window as YTWindow;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve((window as YTWindow).YT as YTNamespace);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return ytApiPromise;
}

/**
 * Desliga legendas. Não existe playerVar que force captions OFF (só ON),
 * então descarregamos os módulos de legenda — precisa repetir no play
 * porque o YouTube recarrega o módulo ao iniciar a reprodução.
 */
function disableCaptions(p: YTPlayer) {
  try {
    p.unloadModule("captions");
    p.unloadModule("cc");
  } catch {
    /* módulo pode não existir nessa versão do player */
  }
}

function formatTime(time: number) {
  if (!Number.isFinite(time) || time < 0) time = 0;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`;
}

export interface VideoPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof videoPlayerVariants> {
  /** ID do vídeo no YouTube (ex.: "DB2wiUEPT18"). */
  videoId: string;
  /** Poster custom. Default: thumbnail do próprio YouTube. */
  poster?: string;
  /** Texto acessível do vídeo. */
  title?: string;
  showControls?: boolean;
  autoHide?: boolean;
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      className,
      size,
      videoId,
      poster,
      title = "Vídeo",
      showControls = true,
      autoHide = true,
      ...props
    },
    ref,
  ) => {
    const [isReady, setIsReady] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [controlsVisible, setControlsVisible] = React.useState(true);
    const [posterSrc, setPosterSrc] = React.useState(
      poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    );
    const [posterFailed, setPosterFailed] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const mountRef = React.useRef<HTMLDivElement>(null);
    const playerRef = React.useRef<YTPlayer | null>(null);
    const hideTimer = React.useRef<number | null>(null);
    const pendingPlay = React.useRef(false);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, []);

    // ── Init do player ───────────────────────────────────────────────
    React.useEffect(() => {
      let cancelled = false;
      const mount = mountRef.current;
      if (!mount) return;

      loadYouTubeApi().then((YT) => {
        if (cancelled || !mountRef.current) return;
        // A API substitui o elemento alvo pelo iframe — usamos um filho
        // descartável pra não perder a div de montagem controlada pelo React.
        const target = document.createElement("div");
        mountRef.current.appendChild(target);
        playerRef.current = new YT.Player(target, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0,
            cc_load_policy: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              disableCaptions(e.target);
              setDuration(e.target.getDuration());
              setIsReady(true);
              if (pendingPlay.current) {
                pendingPlay.current = false;
                e.target.playVideo();
              }
            },
            onStateChange: (e) => {
              if (cancelled) return;
              if (e.data === YT.PlayerState.PLAYING) {
                disableCaptions(e.target);
                setIsPlaying(true);
                if (!duration) setDuration(e.target.getDuration());
              } else if (
                e.data === YT.PlayerState.PAUSED ||
                e.data === YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
                setControlsVisible(true);
              }
            },
          },
        });
      });

      return () => {
        cancelled = true;
        playerRef.current?.destroy();
        playerRef.current = null;
        if (mount) mount.innerHTML = "";
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    // ── Polling do tempo enquanto toca ───────────────────────────────
    React.useEffect(() => {
      if (!isPlaying) return;
      const id = window.setInterval(() => {
        const p = playerRef.current;
        if (!p) return;
        setCurrentTime(p.getCurrentTime());
      }, 250);
      return () => window.clearInterval(id);
    }, [isPlaying]);

    // ── Auto-hide dos controles ──────────────────────────────────────
    const scheduleHide = React.useCallback(() => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      if (autoHide && isPlaying) {
        hideTimer.current = window.setTimeout(() => setControlsVisible(false), 3000);
      }
    }, [autoHide, isPlaying]);

    React.useEffect(() => {
      scheduleHide();
      return () => {
        if (hideTimer.current) window.clearTimeout(hideTimer.current);
      };
    }, [scheduleHide]);

    const revealControls = () => {
      setControlsVisible(true);
      scheduleHide();
    };

    // ── Ações ────────────────────────────────────────────────────────
    const play = React.useCallback(() => {
      const p = playerRef.current;
      if (!p || !isReady) {
        pendingPlay.current = true;
        return;
      }
      p.playVideo();
    }, [isReady]);

    const togglePlay = React.useCallback(() => {
      if (isPlaying) playerRef.current?.pauseVideo();
      else play();
    }, [isPlaying, play]);

    const toggleMute = React.useCallback(() => {
      const p = playerRef.current;
      if (!p) return;
      if (p.isMuted()) {
        p.unMute();
        setIsMuted(false);
      } else {
        p.mute();
        setIsMuted(true);
      }
    }, []);

    const applyVolume = React.useCallback((v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      setVolume(clamped);
      const p = playerRef.current;
      if (!p) return;
      p.setVolume(Math.round(clamped * 100));
      if (clamped === 0) {
        p.mute();
        setIsMuted(true);
      } else if (p.isMuted()) {
        p.unMute();
        setIsMuted(false);
      }
    }, []);

    const seekTo = React.useCallback((t: number) => {
      const clamped = Math.max(0, Math.min(duration || 0, t));
      setCurrentTime(clamped);
      playerRef.current?.seekTo(clamped, true);
    }, [duration]);

    const skip = React.useCallback(
      (seconds: number) => seekTo(currentTime + seconds),
      [currentTime, seekTo],
    );

    const toggleFullscreen = React.useCallback(() => {
      const el = containerRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        el.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }, []);

    React.useEffect(() => {
      const onChange = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", onChange);
      return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    // ── Atalhos de teclado (só com foco dentro do player) ────────────
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (!containerRef.current?.contains(document.activeElement)) return;
        switch (e.key) {
          case " ":
          case "k":
            e.preventDefault();
            togglePlay();
            break;
          case "m":
            e.preventDefault();
            toggleMute();
            break;
          case "f":
            e.preventDefault();
            toggleFullscreen();
            break;
          case "ArrowLeft":
            e.preventDefault();
            skip(-10);
            break;
          case "ArrowRight":
            e.preventDefault();
            skip(10);
            break;
          case "ArrowUp":
            e.preventDefault();
            applyVolume(volume + 0.1);
            break;
          case "ArrowDown":
            e.preventDefault();
            applyVolume(volume - 0.1);
            break;
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [togglePlay, toggleMute, toggleFullscreen, skip, applyVolume, volume]);

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
    const volumePct = (isMuted ? 0 : volume) * 100;
    const overlayVisible = !isPlaying || controlsVisible;

    const iconBtn =
      "p-2 rounded-md text-white/90 transition-colors hover:bg-[rgba(139,155,58,0.28)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,224,64,0.6)]";

    return (
      <div
        ref={containerRef}
        className={cn(videoPlayerVariants({ size }), className)}
        onMouseMove={revealControls}
        onMouseLeave={() => autoHide && isPlaying && setControlsVisible(false)}
        onTouchStart={revealControls}
        tabIndex={0}
        role="region"
        aria-label={title}
        {...props}
      >
        {/* Proporção 16:9 */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {/* Iframe do YouTube (montado pela API) */}
          <div ref={mountRef} className="iap-video__mount absolute inset-0" />

          {/* Overlay transparente: captura cliques (iframe engole pointer events) */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={togglePlay}
            aria-hidden
          />

          {/* Poster: antes do play e em pausa/fim — cobre a barra de título,
              a tela de "mais vídeos" e o end screen do YouTube. */}
          {!isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              {!posterFailed && (
                <img
                  src={posterSrc}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => {
                    // maxres nem sempre existe → tenta hq; se também falhar,
                    // some com o <img> (fica só o fundo escuro + botão play).
                    if (!posterSrc.includes("hqdefault")) {
                      setPosterSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
                    } else {
                      setPosterFailed(true);
                    }
                  }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,10,7,0.15) 0%, rgba(8,10,7,0.35) 60%, rgba(8,10,7,0.8) 100%)",
                }}
              />
            </div>
          )}

          {showControls && (
            <>
              {/* Botão central play/pause */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
                  overlayVisible ? "opacity-100" : "opacity-0",
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  className="iap-video__play pointer-events-auto flex h-[72px] w-[72px] items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(139,155,58,0.22)",
                    border: "1.5px solid rgba(200,224,64,0.55)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 40px -6px rgba(200,224,64,0.35)",
                    color: "#fff",
                  }}
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7" strokeWidth={2.2} />
                  ) : (
                    <Play className="h-7 w-7 ml-1" strokeWidth={2.2} fill="currentColor" />
                  )}
                </button>
              </div>

              {/* Barra de controles */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 transition-opacity duration-300 pointer-events-none",
                  controlsVisible ? "opacity-100" : "opacity-0",
                )}
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,10,7,0.92) 0%, rgba(8,10,7,0.55) 55%, transparent 100%)",
                }}
              >
                <div className="p-3 sm:p-4 space-y-2.5 pointer-events-auto">
                  {/* Progresso */}
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span className="text-[11px] font-mono tabular-nums text-white/80 min-w-[38px]">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 flex items-center">
                      <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={currentTime}
                        aria-label="Progresso do vídeo"
                        onChange={(e) => seekTo(parseFloat(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="iap-range w-full"
                        style={{
                          background: `linear-gradient(to right, #c8e040 0%, #8b9b3a ${progressPct}%, rgba(255,255,255,0.22) ${progressPct}%, rgba(255,255,255,0.22) 100%)`,
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-white/80 min-w-[38px] text-right">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Botões */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Voltar 10 segundos"
                        onClick={(e) => { e.stopPropagation(); skip(-10); }}
                        className={iconBtn}
                      >
                        <SkipBack className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        className={iconBtn}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 ml-0.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label="Avançar 10 segundos"
                        onClick={(e) => { e.stopPropagation(); skip(10); }}
                        className={iconBtn}
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-1 group/volume">
                        <button
                          type="button"
                          aria-label={isMuted ? "Ativar som" : "Silenciar"}
                          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                          className={iconBtn}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                        <div className="w-0 group-hover/volume:w-20 focus-within:w-20 transition-all duration-200 overflow-hidden flex items-center">
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={isMuted ? 0 : volume}
                            aria-label="Volume"
                            onChange={(e) => applyVolume(parseFloat(e.target.value))}
                            onClick={(e) => e.stopPropagation()}
                            className="iap-range iap-range--sm w-full"
                            style={{
                              background: `linear-gradient(to right, #c8e040 0%, #c8e040 ${volumePct}%, rgba(255,255,255,0.22) ${volumePct}%, rgba(255,255,255,0.22) 100%)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                        onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                        className={iconBtn}
                      >
                        {isFullscreen ? (
                          <Minimize className="h-4 w-4" />
                        ) : (
                          <Maximize className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, videoPlayerVariants };
