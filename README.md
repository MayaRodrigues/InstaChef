# InstaChef

Aplicativo mobile de descoberta e preparo de receitas culinárias, desenvolvido em React Native com Expo. O InstaChef permite que o usuário encontre receitas com base nos ingredientes que já tem em casa.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Telas e Componentes](#telas-e-componentes)
- [Dados e Receitas](#dados-e-receitas)
- [Paleta de Cores](#paleta-de-cores)
- [Como Executar](#como-executar)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## Sobre o Projeto

O **InstaChef** é um aplicativo mobile voltado para o público brasileiro que deseja aproveitar os ingredientes disponíveis em casa para preparar refeições práticas e saborosas. A proposta é simples: o usuário seleciona os ingredientes que possui, filtra por categoria (Lanche, Jantar, Sobremesa ou Vegano) e recebe uma lista de receitas compatíveis com o que tem à disposição.

O aplicativo conta com uma interface amigável, intuitiva e com identidade visual aquecida, em português do Brasil.

---

## Funcionalidades

- **Splash Screen** com logo e botão de entrada no aplicativo
- **Seleção de ingredientes** a partir de uma lista com 15 ingredientes comuns
- **Busca por ingrediente** com filtro em tempo real (case-insensitive)
- **Filtro por categoria**: Lanche, Jantar, Sobremesa e Vegano
- **Listagem de receitas** filtradas pelos ingredientes e categoria selecionados
- **Detalhes da receita** com imagem, descrição, lista de ingredientes e passo a passo de preparo
- **Botão "Salvar receita"** na tela de detalhes (UI implementada)
- **Barra de navegação inferior** com abas: Início, Receitas, Salvos e Perfil

---

## Tecnologias Utilizadas

| Tecnologia                      | Versão  | Finalidade                  |
| ------------------------------- | ------- | --------------------------- |
| React Native                    | 0.81.5  | Framework principal mobile  |
| Expo                            | 54.0.0  | Toolchain e build system    |
| React                           | 19.1.0  | Biblioteca de UI            |
| TypeScript                      | 5.9.2   | Tipagem estática            |
| React Navigation (Native)       | 7.2.2   | Navegação entre telas       |
| React Navigation (Native Stack) | 7.14.11 | Stack Navigator             |
| react-native-safe-area-context  | 5.6.0   | Áreas seguras de tela       |
| react-native-screens            | 4.16.0  | Otimização de telas nativas |
| react-native-web                | 0.21.0  | Suporte à plataforma Web    |

---

## Estrutura do Projeto

```
InstaChef/
├── App.tsx                    # Configuração do NavigationContainer e Stack Navigator
├── index.ts                   # Ponto de entrada — registra o App com o Expo
├── app/
│   └── index.tsx              # Re-exporta App.tsx para compatibilidade com Expo Router
├── components/
│   ├── Start.tsx              # Tela de splash / boas-vindas
│   ├── Home.tsx               # Tela principal com seleção de ingredientes
│   ├── Receita.tsx            # Listagem de receitas filtradas
│   └── Preparation.tsx        # Detalhes e preparo da receita
├── data/
│   └── receitas.json          # Base de dados estática com 20 receitas
├── assets/
│   └── images/                # Imagens das receitas e logo do app
├── tsconfig.json              # Configuração TypeScript (modo strict, base Expo)
└── package.json               # Dependências e scripts
```

---

## Telas e Componentes

### 1. Start — Tela Inicial

**Arquivo:** [components/Start.tsx](components/Start.tsx)

Tela de splash exibida ao abrir o aplicativo. Apresenta o logo do InstaChef sobre um fundo marrom-alaranjado (#BA3801) e um botão **"Entrar"** que leva o usuário à tela principal.

---

### 2. Home — Seleção de Ingredientes

**Arquivo:** [components/Home.tsx](components/Home.tsx)

Tela principal do aplicativo. O usuário escolhe os ingredientes disponíveis e, opcionalmente, filtra por categoria de receita.

**Elementos da tela:**

- Saudação ao usuário
- Barra de busca para filtrar ingredientes por nome
- 4 botões de categoria: **Lanche**, **Jantar**, **Sobremesa**, **Vegano**
- Grade de 2 colunas com 15 ingredientes selecionáveis:
  - Ovo, Leite, Farinha, Açúcar, Manteiga, Fermento
  - Tomate, Cebola, Alho, Queijo, Frango, Carne
  - Pão, Batata, Cenoura
- Botão para avançar para a listagem de receitas com os ingredientes selecionados
- Barra de navegação inferior

**Lógica de filtro:**

- Ao selecionar uma categoria, a grade de ingredientes é filtrada para exibir apenas os ingredientes presentes nas receitas daquela categoria
- A busca filtra os ingredientes em tempo real pelo nome digitado
- A seleção de categoria reseta os ingredientes previamente selecionados

---

### 3. Receita — Listagem de Receitas

**Arquivo:** [components/Receita.tsx](components/Receita.tsx)

Exibe as receitas compatíveis com os ingredientes selecionados na tela anterior.

**Elementos da tela:**

- Cards de receita com imagem, nome, badge de categoria e prévia dos ingredientes
- Fallback visual quando a imagem não carrega
- Toque no card navega para a tela de preparo detalhado
- Barra de navegação inferior

**Lógica de filtro:**

- Se ingredientes foram selecionados: exibe receitas que contenham **ao menos um** dos ingredientes selecionados
- Se nenhum ingrediente foi selecionado: exibe **todas as receitas**

**Mapeamento de imagens:**
As imagens são carregadas dinamicamente via um objeto `imagemMap` que resolve os caminhos do JSON para os `require()` corretos das imagens em `/assets/images/`.

---

### 4. Preparation — Detalhes da Receita

**Arquivo:** [components/Preparation.tsx](components/Preparation.tsx)

Exibe todas as informações da receita selecionada.

**Elementos da tela:**

- Imagem da receita em destaque no topo
- Nome da receita
- Descrição (com texto de fallback caso não haja descrição cadastrada)
- Lista completa de ingredientes
- Passo a passo de preparo numerado
- Botão **"Salvar receita"** na parte inferior
- Área de scroll para conteúdo longo

---

## Dados e Receitas

**Arquivo:** [data/receitas.json](data/receitas.json)

Base de dados estática com **20 receitas**, cada uma com a seguinte estrutura:

```json
{
  "id": 1,
  "nome": "Nome da Receita",
  "categoria": "Lanche | Jantar | Sobremesa | Vegano",
  "imagem": "caminho/da/imagem.jpg",
  "tempo": "10 min",
  "porcoes": 2,
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "preparo": ["Passo 1", "Passo 2"],
  "descricao": "Descrição opcional da receita"
}
```

### Receitas por Categoria

**Lanche (5 receitas)**

- Misto Quente
- Pão com Ovo Frito
- Batata Frita com Queijo
- Omelete
- Ovo Frito

**Jantar (4 receitas)**

- Frango Assado com Alho
- Carne Refogada com Cebola
- Frango com Tomate e Cebola
- Batata Cozida com Cenoura

**Sobremesa (4 receitas)**

- Bolo Simples
- Pudim de Leite
- Biscoito de Manteiga
- Creme de Leite com Açúcar

**Vegano (7 receitas)**

- Salada de Cenoura com Alho
- Refogado de Tomate com Cebola
- Batata Assada com Alho
- Sopa de Cenoura e Batata
- Salada de Tomate com Cebola
- Cenoura Cozida com Alho

---

## Paleta de Cores

| Nome             | Hex       | Uso                                   |
| ---------------- | --------- | ------------------------------------- |
| Amarelo Primário | `#FFEC89` | Cabeçalhos, botões de categoria       |
| Marrom/Laranja   | `#BA3801` | Splash screen, estados ativos, botões |
| Laranja          | `#FF6A00` | Barra de navegação inferior, acentos  |
| Azul             | `#4A69B3` | Textos, abas inativas                 |
| Branco           | `#fffdfd` | Fundos de tela                        |
| Cinza Claro      | `#f0efef` | Cards e placeholders                  |

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- Aplicativo **Expo Go** no celular (iOS ou Android) para teste em dispositivo físico
- Emulador Android ou iOS configurado (opcional)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd InstaChef

# Instale as dependências
npm install
```

### Executando o Projeto

```bash
# Inicia o servidor de desenvolvimento
npm start

# Ou diretamente via Expo
npx expo start
```

Após iniciar, escaneie o QR Code com o aplicativo **Expo Go** (Android) ou com a câmera do iPhone (iOS).

---

## Scripts Disponíveis

| Script    | Comando                | Descrição                               |
| --------- | ---------------------- | --------------------------------------- |
| `start`   | `npx expo start`       | Inicia o servidor de desenvolvimento    |
| `android` | `npx expo run:android` | Executa no emulador/dispositivo Android |
| `ios`     | `npx expo run:ios`     | Executa no simulador/dispositivo iOS    |
| `web`     | `npx expo start --web` | Executa na versão web do app            |

---

## Autores

Mayara Rodrigues Pereira @MayaRodrigues
**Desenvolvido para InstaChef**
_Desenvolvido com React Native_
