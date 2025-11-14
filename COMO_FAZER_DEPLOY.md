# 🚀 GUIA DE DEPLOY DO FRONTEND - IntelliGestor

## ✅ PRÉ-REQUISITOS (Você já tem!)

- ✅ Projeto frontend funcionando localmente (http://localhost:3000)
- ✅ Build passando sem erros (`npm run build`)
- ✅ Conta no GitHub
- ⚠️ Falta: Conta na Vercel (vamos criar agora)

---

## 📦 OPÇÃO 1: DEPLOY NA VERCEL (Recomendado - GRÁTIS)

### PASSO 1: Preparar o Projeto (2 minutos)

1. Abra um PowerShell no diretório do frontend:
```powershell
cd c:\Users\jonas\Downloads\intelligestor-backend\intelligestor-backend-main\frontend
```

2. Inicialize o Git (se ainda não foi inicializado):
```powershell
git init
git add .
git commit -m "feat: Initial commit - Frontend IntelliGestor"
```

### PASSO 2: Criar Repositório no GitHub (1 minuto)

1. Acesse: https://github.com/new
2. Nome do repositório: `intelligestor-frontend`
3. Descrição: `Frontend do IntelliGestor - Gestão Inteligente de E-commerce`
4. **Deixe DESMARCADO** "Add a README file"
5. Clique em **"Create repository"**

### PASSO 3: Enviar Código para GitHub (1 minuto)

Copie os comandos que aparecem no GitHub após criar o repositório, ou use estes:

```powershell
# Adicionar remote (SUBSTITUA SEU_USUARIO pelo seu username do GitHub!)
git remote add origin https://github.com/SEU_USUARIO/intelligestor-frontend.git

# Renomear branch para main (se necessário)
git branch -M main

# Enviar código
git push -u origin main
```

**Exemplo real:**
Se seu username é `JonasDluna`:
```powershell
git remote add origin https://github.com/JonasDluna/intelligestor-frontend.git
git branch -M main
git push -u origin main
```

### PASSO 4: Deploy na Vercel (3 minutos)

1. **Criar conta/Login na Vercel:**
   - Acesse: https://vercel.com/signup
   - Clique em "Continue with GitHub"
   - Autorize a Vercel a acessar seus repositórios

2. **Importar Projeto:**
   - Após login, você verá seus repositórios do GitHub
   - Clique em "Import" no repositório `intelligestor-frontend`
   
3. **Configurar Deploy:**
   - **Framework Preset:** Next.js (já detecta automaticamente)
   - **Root Directory:** `./` (deixe vazio, está correto)
   - **Build Command:** `npm run build` (já preenchido)
   - **Output Directory:** `.next` (já preenchido)

4. **Adicionar Variáveis de Ambiente:**
   
   Clique em "Environment Variables" e adicione:
   
   ```
   Nome: NEXT_PUBLIC_API_URL
   Valor: https://intelligestor-backend.onrender.com
   ```
   
   ```
   Nome: NODE_ENV
   Valor: production
   ```

5. **Clicar em "Deploy"** 🚀

⏳ **Aguarde 2-3 minutos** enquanto a Vercel faz o build e deploy.

### PASSO 5: Acessar seu App! 🎉

Após o deploy, você receberá uma URL como:
```
https://intelligestor-frontend.vercel.app
```

ou

```
https://intelligestor-frontend-seu-usuario.vercel.app
```

---

## 🔒 PASSO 6: Configurar CORS no Backend (Importante!)

Agora que o frontend está no ar, precisamos adicionar a URL da Vercel no backend:

1. **Copie sua URL da Vercel** (exemplo: `https://intelligestor-frontend.vercel.app`)

2. **Edite o arquivo de configuração do backend:**

Abra: `c:\Users\jonas\Downloads\intelligestor-backend\intelligestor-backend-main\app\config\settings.py`

Procure por `ALLOWED_ORIGINS` e adicione sua URL:

```python
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://intelligestor-frontend.vercel.app",  # ⬅️ SUA URL AQUI!
]
```

3. **Fazer commit e push:**

```powershell
cd c:\Users\jonas\Downloads\intelligestor-backend\intelligestor-backend-main

git add app/config/settings.py
git commit -m "feat: Add Vercel URL to CORS allowed origins"
git push origin main
```

O Render vai detectar o push e fazer deploy automaticamente em ~2 minutos!

---

## 📦 OPÇÃO 2: DEPLOY NA NETLIFY (Alternativa)

Se preferir usar Netlify:

1. Acesse: https://app.netlify.com/start
2. Login com GitHub
3. Selecione o repositório `intelligestor-frontend`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://intelligestor-backend.onrender.com
   NODE_ENV=production
   ```
6. Deploy site

---

## 🔄 ATUALIZAÇÕES FUTURAS

Após o primeiro deploy, toda vez que você fizer mudanças:

```powershell
cd c:\Users\jonas\Downloads\intelligestor-backend\intelligestor-backend-main\frontend

# Fazer suas alterações...
# Depois:

git add .
git commit -m "feat: Descrição das mudanças"
git push origin main
```

A Vercel/Netlify vai automaticamente:
- ✅ Detectar o push
- ✅ Fazer build
- ✅ Deploy automático
- ✅ Atualizar o site (em ~2 minutos)

---

## 🐛 TROUBLESHOOTING

### Erro: "Build Failed"

1. Teste localmente primeiro:
```powershell
npm run build
```

2. Se funcionar localmente, verifique as variáveis de ambiente na Vercel

### Erro: "Cannot connect to API"

1. Verifique se o backend está no ar: https://intelligestor-backend.onrender.com/health
2. Verifique se adicionou a URL da Vercel no CORS do backend
3. Aguarde 5 minutos após mudança no backend (Render demora um pouco)

### Erro: "Module not found"

Certifique-se que todas as dependências estão no `package.json`:
```powershell
npm install
git add package.json package-lock.json
git commit -m "fix: Update dependencies"
git push
```

---

## 📊 MONITORAMENTO

### Vercel Dashboard:
- https://vercel.com/dashboard
- Veja logs de build
- Analíticas de visitas
- Configurações

### Render Dashboard (Backend):
- https://dashboard.render.com
- Status do backend
- Logs em tempo real

---

## ✨ PRONTO!

Seu sistema IntelliGestor estará 100% no ar! 🎉

**Frontend:** https://seu-app.vercel.app  
**Backend:** https://intelligestor-backend.onrender.com

---

## 📞 PRECISA DE AJUDA?

Se encontrar algum problema:

1. Verifique os logs na Vercel Dashboard
2. Teste o build localmente: `npm run build`
3. Verifique as variáveis de ambiente
4. Confirme que o backend está respondendo

---

**Tempo total estimado: 10-15 minutos** ⏱️

Boa sorte com o deploy! 🚀
