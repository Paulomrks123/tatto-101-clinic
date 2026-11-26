# Modelos de ficha — 101Clinic Tattoo & Body Piercing

> Especificação funcional para os formulários. Esta lista não substitui avaliação clínica, orientação sanitária ou revisão jurídica. Não usar esta versão como coleta de dados reais até que o fluxo de armazenamento, privacidade, retenção e acesso esteja definido.

## Fluxo combinado sem banco de dados

1. A clínica abre `/admin` no próprio aparelho.
2. Escolhe **Tatuagem** ou **Piercing** e compartilha o link público correspondente pelo WhatsApp.
3. O cliente preenche no próprio celular, revisa as respostas, lê o termo e desenha a assinatura.
4. O cliente gera/baixa uma cópia em PDF pelo recurso de impressão do aparelho (Salvar como PDF) e envia o arquivo à clínica pelo WhatsApp.
5. A clínica salva o PDF manualmente em local protegido e controla o recebimento fora do site.

**Limitações deliberadas:** sem banco, os links são modelos gerais, não links individuais com estado; o site não recebe respostas, não acompanha status, não guarda PDFs e não recupera formulários fechados. Não colocar nome, telefone, respostas ou dados de saúde em parâmetros de URL. Não usar localStorage para guardar anamnese, assinatura ou documentos.

## Campos comuns — identificação e atendimento

- Nome completo.
- Data de nascimento.
- Telefone/WhatsApp com DDD.
- Procedimento pretendido e região do corpo.
- Data prevista do procedimento.
- Nome e contato do responsável legal, quando aplicável.
- Confirmação de que as informações foram prestadas pelo próprio cliente ou responsável.

## Ficha de tatuagem

### Saúde e segurança — autorrelato
- Possui alergias conhecidas? (não / sim / não sabe). Se sim, campo para descrever.
- Possui condição de saúde que considera relevante para o procedimento? (não / sim / prefere conversar em particular). Campo opcional para descrição.
- Usa medicamentos atualmente? (não / sim / prefere conversar em particular). Campo opcional.
- Tem histórico de reação a pigmentos, cosméticos, adesivos, látex ou antissépticos? (não / sim / não sabe). Campo para detalhes.
- Está com irritação, ferida, infecção ou alteração de pele na região? (não / sim / não sabe).
- Observações que deseja informar ao profissional.

### Procedimento
- Descrição/tema da tatuagem.
- Região do corpo.
- Tamanho aproximado.
- Cor: preto/cinza, colorida, ainda não definido.
- Confirmação de que recebeu explicações sobre cuidados antes e depois.
- Confirmação de que teve oportunidade de tirar dúvidas.

## Ficha de piercing

### Saúde e segurança — autorrelato
- Possui alergias conhecidas, especialmente a metais, antissépticos, látex ou adesivos? (não / sim / não sabe). Campo para detalhes.
- Possui condição de saúde que considera relevante? (não / sim / prefere conversar em particular).
- Usa medicamentos atualmente? (não / sim / prefere conversar em particular).
- Tem histórico de queloide/cicatrização difícil ou reação a joias? (não / sim / não sabe).
- Existe irritação, ferida ou infecção na região escolhida? (não / sim / não sabe).
- Observações que deseja informar ao profissional.

### Procedimento
- Local exato do piercing.
- Joia/material pretendido, se já definido.
- Confirmação de que recebeu explicações sobre higiene, cicatrização, riscos e cuidados posteriores.
- Confirmação de que teve oportunidade de tirar dúvidas.

## Consentimento e assinatura

Cada ficha deve apresentar, em linguagem simples e revisada pela clínica:

- Identificação da 101Clinic e finalidade da coleta.
- Declaração de que as respostas são verdadeiras e completas, até onde o cliente sabe.
- Confirmação de que o procedimento, cuidados, riscos relevantes e alternativas foram explicados e que dúvidas puderam ser esclarecidas.
- Autorização específica para realizar o procedimento escolhido, sem cláusula genérica que substitua a conversa com o profissional.
- Aviso de privacidade: quais dados são coletados, finalidade, quem terá acesso, por quanto tempo serão guardados, como solicitar acesso/correção/exclusão e canal de contato.
- Campo para nome completo, data, assinatura desenhada e confirmação de leitura.

A assinatura digital desenhada no formulário, por si só, não garante validade jurídica nem prova que todos os requisitos de consentimento foram cumpridos. A clínica deve revisar o texto com assessoria jurídica e sanitária.

## Menores de idade

Não habilitar o procedimento para menores apenas com uma caixa de seleção. Exigir fluxo próprio validado pela clínica e assessoria jurídica, identificação e assinatura do responsável legal, confirmação da relação com o menor e verificação presencial dos documentos quando exigida. Regras podem variar conforme procedimento e legislação aplicável.

## Não coletar por padrão

- CPF, RG ou foto de documento, salvo necessidade legal justificada e processo seguro definido.
- Dados de cartão, senha ou informações financeiras.
- Diagnósticos detalhados que não sejam necessários para avaliar segurança do procedimento.
- Fotos íntimas ou imagens de áreas sensíveis.
- Dados de saúde em links, mensagens automáticas, analytics ou logs.

## Critérios de aceite antes de uso real

- [ ] A página pública principal permanece visualmente inalterada.
- [ ] `/admin` não tem link na landing page.
- [ ] O painel oferece dois atalhos: ficha de tatuagem e ficha de piercing.
- [ ] O link compartilhado não contém dados pessoais do cliente.
- [ ] O formulário permite revisar e imprimir/salvar em PDF com assinatura visível.
- [ ] O cliente consegue enviar o PDF à clínica pelo WhatsApp.
- [ ] O site não persiste respostas, assinaturas ou PDFs em localStorage, URL, logs ou GitHub.
- [ ] Texto de consentimento, menores e aviso de privacidade foram revisados pela clínica antes de produção.
