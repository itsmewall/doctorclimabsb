from flask import Flask, render_template, request, flash, redirect, url_for
import datetime

app = Flask(__name__)
app.secret_key = 'doctorclima_secret_key'  # Needed for flash messages

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contato', methods=['POST'])
def contato():
    nome = request.form.get('nome')
    telefone = request.form.get('telefone')
    servico = request.form.get('servico')
    mensagem = request.form.get('mensagem')

    if not nome or not telefone or not servico:
        flash('Por favor, preencha todos os campos obrigatórios.', 'error')
        return redirect(url_for('index', _anchor='contato'))

    # Log to console
    print(f"[{datetime.datetime.now()}] NOVO CONTATO:")
    print(f"Nome: {nome}")
    print(f"Telefone: {telefone}")
    print(f"Serviço: {servico}")
    print(f"Mensagem: {mensagem}")
    print("-" * 30)
    
    # Render direct success page
    return render_template('sucesso.html')

if __name__ == '__main__':
    app.run(debug=True)
