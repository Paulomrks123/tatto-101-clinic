# Área administrativa — 101Clinic

## O que está incluído nesta etapa
- Rota administrativa em `/admin`, com navegação, indicadores demonstrativos e áreas de fichas, menores/responsáveis e configurações.
- Rota pública preparada em `/ficha/$token`.
- Tipos de domínio e dados estritamente fictícios para pré-visualização.
- Interface responsiva alinhada à identidade escura da 101Clinic.
- Nenhuma alteração na página pública inicial.

## Estado atual: interface, não produção
Esta entrega não implementa autenticação real, persistência, envio de WhatsApp, links assinados, assinatura legal ou armazenamento de documentos. Os botões de operações que dependem do servidor ficam desabilitados. Os dados da demonstração são exemplos e não devem ser substituídos por dados reais no navegador.

**Não colete dados pessoais ou dados de saúde nesta versão.** Dados de anamnese são sensíveis. Antes de produção, implemente controle de acesso no servidor, políticas de menor privilégio, criptografia em trânsito e em repouso, trilha de auditoria, retenção e descarte, consentimento e atendimento aos direitos LGPD.

## Próxima etapa: conectar Supabase
1. Criar projeto e configurar variáveis apenas no ambiente de deploy; nunca commitar chaves.
2. Implementar Auth com usuários administrativos convidados (sem cadastro público).
3. Criar tabelas para perfis, fichas, respostas, responsáveis, consentimentos e eventos de auditoria.
4. Ativar RLS em todas as tabelas e políticas por perfil; validar autorização também no servidor/Edge Functions.
5. Gerar tokens aleatórios de uso limitado, guardar somente hash, aplicar expiração e rate limiting.
6. Implementar armazenamento privado para anexos, URLs temporárias e validação de MIME/tamanho.
7. Adicionar assinatura desenhada, registro de data/hora, versão do termo e evidências necessárias após revisão jurídica.
8. Revisar especificamente o tratamento de dados de saúde e o fluxo de menores com assessoria jurídica e sanitária.
9. Testar permissões, acesso cruzado, expiração, exportação, exclusão e recuperação antes de publicar.

## Estrutura sugerida
- `src/features/admin/`: painel e domínio administrativo.
- `src/routes/admin.tsx`: painel.
- `src/routes/ficha.$token.tsx`: formulário público por token.
- `docs/ADMIN-SETUP.md`: roteiro de integração e segurança.

## Desenvolvimento
Acesse `/admin` no ambiente local para visualizar a interface demonstrativa. O painel não deve ser considerado protegido para uso real até a autenticação e as verificações server-side estarem implementadas.


## Modo local sem banco de dados (implementado)
O painel `/admin` permite cadastrar, consultar, editar e excluir fichas no armazenamento local do navegador (`localStorage`). Os indicadores são calculados a partir dos registros deste dispositivo.

### Exportações disponíveis
- **JSON:** backup completo dos registros locais.
- **CSV:** planilha compatível com Excel, LibreOffice e Google Sheets.
- **Relatório/PDF:** usa a impressão do navegador; selecione “Salvar como PDF”.

Os dados não são enviados ao GitHub nem a um servidor, não sincronizam entre aparelhos e podem ser perdidos ao limpar os dados do navegador. Faça backups manuais regularmente. A exportação contém os campos preenchidos na ficha e deve ser guardada em local protegido.

**Limite de segurança:** este modo é apenas para prototipagem e demonstração. Não armazene dados reais de saúde, documentos ou informações de menores no navegador sem uma avaliação de segurança e controles adequados. Para operação real, migrar para backend com autenticação, criptografia, controle de acesso, auditoria, retenção e políticas LGPD.
