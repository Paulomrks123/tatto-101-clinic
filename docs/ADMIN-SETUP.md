# Área administrativa — 101Clinic

## O que está incluído nesta etapa
- Rota administrativa em `/admin`, com navegação, indicadores demonstrativos e áreas de fichas, menores/responsáveis e configurações.
- Rota pública preparada em `/ficha/$token`.
- Tipos de domínio e dados estritamente fictícios para pré-visualização.
- Interface responsiva alinhada à identidade escura da 101Clinic.
- Nenhuma alteração na página pública inicial.

## Estado atual: demonstração local, não produção
O painel prepara links para fichas de tatuagem e piercing e abre o WhatsApp para compartilhamento. A ficha é preenchida no aparelho do cliente e pode ser impressa/salva em PDF. Não existe autenticação real no servidor, banco de dados, sincronização, link individual com token, expiração, envio automático das respostas ou armazenamento de documentos. A senha é apenas uma trava local do navegador e pode ser contornada; não deve ser tratada como controle de acesso.

**Não utilize esta versão para armazenar dados pessoais, informações de saúde ou dados de menores.** Dados de anamnese são sensíveis. Antes de produção, implemente controle de acesso no servidor, criptografia, trilha de auditoria, retenção e descarte, consentimento e atendimento à LGPD.

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


## Limitações do modo atual
Não há cadastro, histórico de fichas, exportação de registros ou persistência de respostas no painel atual. Os dados preenchidos na ficha permanecem no navegador do cliente até a impressão ou saída da página. Os detalhes do procedimento podem ser pré-preenchidos pelo link; o nome do cliente não é incluído na URL. Não inclua dados pessoais ou de saúde em links.
