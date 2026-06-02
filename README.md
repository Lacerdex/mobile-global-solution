# Mobile Global Solution

### Integrantes

| Nome | RM |
| :--- | :--- |
| Gabriel Lacerda Covello Arimatéa | 556391 |
| Mayene Gabrielle Aragão Padilha Doria | 558858 |

---

Projeto desenvolvido para monitoramento, gestão e auditoria de informações operacionais divididas em três domínios centrais: **Sensores**, **Alertas** e **Eventos**.

A solução é arquitetada de forma desacoplada em duas partes:

- **Backend (global_solution)**: API REST robusta desenvolvida em Java 17 e Spring Boot 3.x, utilizando persistência em banco de dados relacional H2 e transações gerenciadas para operações de CRUD.
- **Frontend (interface_gs)**: Aplicativo multiplataforma em React Native (Expo) compatível com Web e Mobile, consumindo endpoints assíncronos da API.

---

## 1) Backend — global_solution (Spring Boot)

### Persistência e Configurações
- **Banco de Dados**: H2 configurado em modo **file** (arquivo) para manter o estado dos dados localmente entre reinicializações durante os testes operacionais.
- **Mapeamento de Enums**: Configurado estritamente como `EnumType.STRING` nas entidades para garantir integridade textual no banco de dados e evitar erros de desserialização (Erro 500).
- **Estratégia de Schema**: Atualização automática via `spring.jpa.hibernate.ddl-auto=update`.
- **Console do H2**: Habilitado e acessível em `/h2-console`.

### Entidades e Modelagem
- **Sensor** (`tb_sensores`)
  - Campos: `id` (Long), `nome` (String), `localizacao` (String), `tipo` (String), `status` (`SensorStatus`), `dataHora` (LocalDateTime).
- **Alerta** (`tb_alertas`)
  - Campos: `id` (Long), `componente` (String), `descricao` (String), `gravidade` (`AlertaGravidade`), `dataHora` (LocalDateTime).
- **Evento** (`tb_eventos`)
  - Campos: `id` (Long), `titulo` (String), `tipo` (String), `descricao` (String), `dataHora` (LocalDateTime).

### Endpoints REST
O backend expõe as rotas abaixo (com CORS totalmente liberado globalmente via `@CrossOrigin(origins = "*")`):

#### Sensores — `/api/sensores`
- `POST /api/sensores` — Cria um novo registro de sensor.
- `GET /api/sensores` — Retorna todos os sensores ativos.
- `GET /api/sensores/filtro?status=...` — Filtra sensores por status operacional.
- `GET /api/sensores/{id}` — Busca detalhes de um sensor específico.
- `DELETE /api/sensores/{id}` — Remove um sensor (Operação protegida por `@Transactional`).

#### Alertas — `/api/alertas`
- `POST /api/alertas` — Registra uma nova ocorrência de alerta.
- `GET /api/alertas` — Lista todos os alertas operacionais.
- `GET /api/alertas/filtro?gravidade=...` — Filtra alertas por nível de criticidade.
- `GET /api/alertas/{id}` — Busca um alerta por ID.
- `DELETE /api/alertas/{id}` — Exclui permanentemente um alerta.

#### Eventos — `/api/eventos`
- `POST /api/eventos` — Registra um novo evento técnico.
- `GET /api/eventos` — Lista o histórico de eventos.
- `GET /api/eventos/filtro?tipo=...` — Filtra eventos por sua tipagem.
- `GET /api/eventos/{id}` — Busca evento por ID.
- `DELETE /api/eventos/{id}` — Exclui um evento do histórico.

---

## 2) Frontend — interface_gs (React Native)

### Integração Híbrida e Comunicação
- Cliente HTTP baseado em **Axios** para consumo de promessas assíncronas.
- **Base URL** unificada em `src/services/api.ts` apontando para `http://localhost:8080/api`.
- **Segurança Multiplataforma**: Os métodos de exclusão utilizam a API `Platform` do React Native. Se rodando em ambiente **Web**, executam caixas de diálogo nativas do navegador via `window.confirm()` para impedir travamento do thread; se em **Mobile**, acionam o `Alert.alert()` nativo.

### Telas e Fluxos

#### 1. Sensores
- **Listagem Ativa**: Exibição otimizada via `FlatList` alimentada pelo endpoint `GET /sensores`.
- **Cadastro**: Captura de dados em formulário controlado dentro do `NovoRegistroModal` injetando o enum `SensorStatus` (`OK`, `ALERTA`, `CRITICO`, `INATIVO`).
- **Exclusão Reativa**: Botão de exclusão incorporado ao `SensorCard` que remove o registro do banco de dados e limpa o estado em tempo real no cliente via mutação de array.

#### 2. Alertas
- **Painel de Monitoramento**: Listagem alimentada por `GET /alertas` exibindo badges estilizados.
- **Cadastro**: Modal dedicado para entrada de `componente`, `descricao` e seleção dinâmica do enum `AlertaGravidade`.
- **Exclusão**: Botão reativo acoplado ao card com confirmação de segurança.

#### 3. Eventos
- **Histórico Geral**: Renderização de eventos técnicos disparados por `GET /eventos`.
- **Formulário de Entrada**: Cadastro intuitivo coletando `titulo`, `tipo` e `descricao` do incidente/evento.
- **Exclusão**: Integração ponta a ponta com o verbo `DELETE` correspondente no backend.

---

## Como Executar o Ecossistema

### Pré-requisitos
- Java JDK 17 instalado.
- Node.js (versão LTS) instalado.
- Expo CLI configurado.

### Passo 1: Executando o Backend
1. Navegue até a pasta raiz do backend:
   ```bash
   cd global_solution
   ```

2. Execute a aplicação usando sua IDE de preferência ou via terminal:
    ```bash
    ./mvnw spring-boot:run
    ```

3. O servidor subirá na porta padrão 8080.

### Passo 2: Executando o Frontend
1. Navegue até a pasta do aplicativo React Native:
    ```bash
    cd interface_gs
    ```

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

3. Inicialize o servidor bundler do Expo:
    ```bash
    npx expo start
    ```

4. Pressione `w` para abrir no navegador (Ambiente Web) ou escaneie o QR Code com o aplicativo Expo Go no celular para testar em ambiente Mobile nativo.

---

## Observações Arquiteturais

*   **CORS Liberado:** A configuração de origens está definida como * exclusivamente para fins acadêmicos e facilidade de testes em múltiplos emuladores.
*   **Sincronização:** Todas as deleções e inserções realizam atualizações otimistas ou limpezas reativas no estado do React (useState), evitando a necessidade de múltiplos re-refresh desnecessários na rede.

---