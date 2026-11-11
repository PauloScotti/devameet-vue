# Devameet — Web (Vue)

Interface web de salas de reunião virtuais, no estilo Gather: o usuário monta salas posicionando objetos em um mapa e os participantes entram, se movem pelo espaço e conversam por áudio e vídeo.

Feita com Vue 3 e Vite, consome a [API do Devameet](https://github.com/PauloScotti/devameet-nest-js) por HTTP e por WebSocket (socket.io); o áudio e o vídeo trafegam direto entre os navegadores por WebRTC. Nasceu como projeto da formação Devaria e foi atualizada para as versões atuais do Vue e do Vite.

## Stack

| Camada     | Tecnologia                            |
| ---------- | ------------------------------------- |
| Framework  | Vue 3, Vue Router 5, Pinia            |
| Build      | Vite 8, TypeScript                    |
| Estilos    | Sass                                  |
| Tempo real | socket.io-client e WebRTC             |
| HTTP       | axios                                 |
| Testes     | Vitest                                |

## Como rodar

```bash
npm install
cp .env.example .env   # preencha os dois endereços
npm run dev
```

| Variável              | Para quê                                      |
| --------------------- | --------------------------------------------- |
| `VITE_VUE_PUBLIC_API_URL` | Endereço da API, sem `/api` no fim            |
| `VITE_VUE_PUBLIC_WS_URL`  | Endereço do WebSocket (normalmente o mesmo)   |

O navegador só libera câmera e microfone em `localhost` ou em HTTPS.

## Telas

Login, cadastro com escolha de avatar, lista de reuniões, criação e edição de sala (em telas grandes), entrada por link e a sala em si. As rotas estão em `src/router/index.ts`.

## Estrutura

```
src/assets/      estilos, imagens e os objetos das salas
src/components/  componentes por área (geral, reunião, sala)
src/router/      rotas e proteção das telas que exigem login
src/services/    chamadas à API, WebSocket e WebRTC
src/stores/      estado do token (Pinia)
src/views/       telas
```

## Verificação

```bash
npm run type-check
```

```bash
npm test
```

```bash
npm run build
```

## Sessão

O token fica no `localStorage` e vai no cabeçalho `Authorization` de cada requisição. Quando a API responde 401 com uma sessão ativa (token expirado ou inválido), a sessão é encerrada e o usuário volta para o login.
