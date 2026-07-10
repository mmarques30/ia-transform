import { useIapIn } from "@/components/sections/business/variantB/painel/useIapIn";

/**
 * ChaosCards (LP-B) — trio de mockups "do antes" que substitui os
 * slots verdes inclinados da dobra Problem.
 *
 * Três cards fielmente portados de mockups_caos_lp_businessv2.html:
 *  1. WhatsApp lotado (PROBLEMA 01 · Tudo passa por você)
 *  2. Planilha quebrada (PROBLEMA 02 · A operação numa planilha)
 *  3. Inbox de madrugada (PROBLEMA 03 · O dia termina, o caos não)
 *
 * Estética: paleta dessaturada (filter: saturate(.55)) + único acento
 * vermelho #e5484d — contraste proposital com os painéis coloridos do
 * "depois" (Vetra/Blocaz/Atlas/Rota Sul).
 *
 * Entrada em cascata via useIapIn: quando o trio entra no viewport, o
 * wrapper ganha .iap-in e cada card revela com stagger de 150ms
 * (--caos-d 0.05s / 0.2s / 0.35s).
 *
 * Skew/tilt (rotateY -7deg + rotateX 2deg + skewY -1deg) mora no
 * .caos-card do styles.css; ele substitui o skewX(-8deg) do wrapper
 * antigo que ficava chato no crop de aspectRatio 3/1.2.
 */
export function ChaosCards() {
  const { ref, isIn } = useIapIn(0.3);

  return (
    <div ref={ref} className={`caos-trio ${isIn ? "iap-in" : ""}`}>
      <CaosWhatsapp />
      <CaosPlanilha />
      <CaosInbox />
    </div>
  );
}

function CaosWhatsapp() {
  return (
    <div className="caos-card" style={{ ["--caos-d" as string]: "0.05s" }}>
      <div className="caos-statusbar">
        <span className="caos-t">22:41</span>
        <span>▂▄▆ 12%</span>
      </div>
      <div className="caos-app-head">
        <span className="caos-app-title">Operação</span>
        <span className="caos-badge-total">47</span>
      </div>
      <ChatRow
        initials="EQ"
        name="Equipe · Operação"
        time="22:39"
        preview="chefe, aprova esse aqui?"
        count="12"
      />
      <ChatRow
        initials="FC"
        name="Fernanda · Comercial"
        time="22:31"
        preview="e aquele orçamento? cliente cobrando"
        count="8"
      />
      <ChatRow
        initials="CA"
        name="Cliente · Alfa"
        time="22:04"
        preview="terceira vez que pergunto o status…"
        count="5"
      />
      <ChatRow
        initials="JF"
        name="João · Financeiro"
        time="21:47"
        preview="não achei a planilha, qual a versão certa?"
        count="9"
      />
      <ChatRow
        initials="EN"
        name="Entregas"
        time="21:12"
        preview="deu problema na saída de amanhã"
        count="13"
      />
      <span className="caos-label">
        PROBLEMA 01 · <b>Tudo passa por você</b>
      </span>
    </div>
  );
}

function ChatRow(props: {
  initials: string;
  name: string;
  time: string;
  preview: string;
  count: string;
}) {
  return (
    <div className="caos-chat">
      <div className="caos-av">{props.initials}</div>
      <div className="caos-body">
        <div className="caos-row1">
          <span className="caos-name">{props.name}</span>
          <span className="caos-time">{props.time}</span>
        </div>
        <div className="caos-prev">{props.preview}</div>
      </div>
      <span className="caos-n">{props.count}</span>
    </div>
  );
}

function CaosPlanilha() {
  return (
    <div className="caos-card" style={{ ["--caos-d" as string]: "0.2s" }}>
      <div className="caos-statusbar">
        <span className="caos-t">controle_geral</span>
        <span>editado por 4 pessoas</span>
      </div>
      <div className="caos-sheet-head">
        <div className="caos-sheet-file">
          FINAL_v3_AGORA-VAI.xlsx <small>· conflito de versão</small>
        </div>
      </div>
      <div className="caos-formula">
        <span className="caos-fx">fx</span>
        <span>
          =PROCV(A47;<span className="caos-err">#REF!</span>;3;FALSO)
        </span>
      </div>
      <div className="caos-grid">
        <div className="caos-cell caos-h"></div>
        <div className="caos-cell caos-h">A</div>
        <div className="caos-cell caos-h">B</div>
        <div className="caos-cell caos-h">C</div>
        <div className="caos-cell caos-h">D</div>

        <div className="caos-cell caos-h">45</div>
        <div className="caos-cell">Pedido 1041</div>
        <div className="caos-cell">entregue?</div>
        <div className="caos-cell">R$ 12.400</div>
        <div className="caos-cell caos-warn">atrasado</div>

        <div className="caos-cell caos-h">46</div>
        <div className="caos-cell">Pedido 1042</div>
        <div className="caos-cell">ver c/ João</div>
        <div className="caos-cell">R$ 8.900</div>
        <div className="caos-cell">—</div>

        <div className="caos-cell caos-h">47</div>
        <div className="caos-cell">Pedido 1043</div>
        <div className="caos-cell caos-cell-err">#REF!</div>
        <div className="caos-cell caos-cell-err">#REF!</div>
        <div className="caos-cell caos-warn">???</div>

        <div className="caos-cell caos-h">48</div>
        <div className="caos-cell">Pedido 1044</div>
        <div className="caos-cell">perguntar</div>
        <div className="caos-cell">R$ 21.300</div>
        <div className="caos-cell">—</div>

        <div className="caos-cell caos-h">49</div>
        <div className="caos-cell">Pedido 1045</div>
        <div className="caos-cell"></div>
        <div className="caos-cell caos-cell-err">#DIV/0!</div>
        <div className="caos-cell caos-warn">refazer</div>
      </div>
      <div className="caos-tabs">
        <span className="caos-tab caos-on">Geral</span>
        <span className="caos-tab">Pedidos</span>
        <span className="caos-tab">Estoque_v2</span>
        <span className="caos-tab">Cobrança</span>
        <span className="caos-tab">NÃO MEXER</span>
        <span className="caos-tab caos-more">+7 abas</span>
      </div>
      <span className="caos-label">
        PROBLEMA 02 · <b>A operação numa planilha</b>
      </span>
    </div>
  );
}

function CaosInbox() {
  return (
    <div className="caos-card" style={{ ["--caos-d" as string]: "0.35s" }}>
      <div className="caos-statusbar">
        <span className="caos-t">23:47</span>
        <span>quinta-feira</span>
      </div>
      <div className="caos-inbox-head">
        <span className="caos-inbox-title">Caixa de entrada</span>
        <span className="caos-inbox-count">312 não lidos</span>
      </div>
      <MailRow unread from="Cliente Meridian" time="23:31">
        <span className="caos-urg">URGENTE:</span> prazo de amanhã está de pé?
      </MailRow>
      <MailRow unread from="Banco · Cobrança" time="22:58">
        Aviso: título vence hoje
      </MailRow>
      <MailRow unread from="Renata · Operação" time="22:15">
        Re: Re: Re: Re: orçamento revisado (v4)
      </MailRow>
      <MailRow from="Contabilidade" time="21:40">
        Pendências do fechamento — faltam 14 itens
      </MailRow>
      <MailRow unread from="Cliente Alfa" time="20:52">
        <span className="caos-urg">Sem resposta:</span> proposta enviada há 6 dias
      </MailRow>
      <span className="caos-label">
        PROBLEMA 03 · <b>O dia termina, o caos não</b>
      </span>
    </div>
  );
}

function MailRow(props: {
  unread?: boolean;
  from: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`caos-mail ${props.unread ? "caos-unread" : ""}`}>
      <div className="caos-row1">
        <span className="caos-from">{props.from}</span>
        <span className="caos-time">{props.time}</span>
      </div>
      <div className="caos-subj">{props.children}</div>
    </div>
  );
}
