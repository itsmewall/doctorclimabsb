# Doctor Clima - Ar Condicionado

Projeto de landing page institucional para a empresa de manutenção e instalação de ar-condicionado.
Desenvolvido com Python (Flask) e design limpo responsive.

## Estrutura do Projeto

- `app.py`: Aplicação Flask principal (rotas e lógica).
- `templates/`: Arquivos HTML (Jinja2).
- `static/`: Estilos CSS, scripts JS e imagens.
- `requirements.txt`: Dependências do Python.

## Como Executar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina:

1. **Clone o repositório ou baixe os arquivos.**

2. **Crie um ambiente virtual (recomendado):**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute o servidor Flask:**
   ```bash
   flask run
   # ou
   python app.py
   ```

5. **Acesse no navegador:**
   - Abra [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Funcionalidades para Hospedagem

- O formulário envia para `/contato` via POST.
- Os dados são validados e exibidos no console do servidor (logs).
- Não utiliza banco de dados (stateless), ideal para hospedagem simples (Vercel, Render, PythonAnywhere).

## Identidade Visual

- **Cores:** Azul Marinho (#071A3A), Azul Vivo (#0B3AAE), Branco Gelo (#DDEBFF).
- **Tipografia:** Inter (Google Fonts).

---
Desenvolvido para Doctor Clima Ar Condicionado.
