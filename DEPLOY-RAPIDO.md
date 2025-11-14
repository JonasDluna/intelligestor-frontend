# 🚀 FAZER DEPLOY - 3 COMANDOS

## ⚡ FORMA MAIS RÁPIDA (Automática)

Abra PowerShell e execute:

```powershell
cd c:\Users\jonas\Downloads\intelligestor-backend\intelligestor-backend-main\frontend

# SUBSTITUA "SEU_USUARIO" pelo seu username do GitHub!
.\deploy-vercel.ps1 -GithubUsername "SEU_USUARIO"
```

**Exemplo:**
```powershell
.\deploy-vercel.ps1 -GithubUsername "JonasDluna"
```

O script vai:
1. ✅ Verificar se o build funciona
2. ✅ Configurar Git
3. ✅ Fazer commit
4. ✅ Enviar para GitHub
5. ✅ Abrir Vercel no navegador

---

## 📋 O QUE VOCÊ PRECISA:

### ANTES de rodar o script:

1. **Criar repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome: `intelligestor-frontend`
   - Deixe VAZIO (não marque "Add README")
   - Clique "Create repository"

2. **Ter Personal Access Token (se ainda não tem):**
   - Acesse: https://github.com/settings/tokens
   - "Generate new token (classic)"
   - Marque: `repo` (acesso completo)
   - Copie o token (guarde bem!)

### DEPOIS que o script rodar:

3. **Fazer deploy na Vercel:**
   - O navegador vai abrir automaticamente
   - Login com GitHub
   - Selecione `intelligestor-frontend`
   - Adicione variáveis:
     ```
     NEXT_PUBLIC_API_URL = https://intelligestor-backend.onrender.com
     NODE_ENV = production
     ```
   - Clique "Deploy"
   - Aguarde 2-3 minutos

4. **Configurar CORS no backend:**
   - Copie a URL da Vercel (ex: https://intelligestor-frontend.vercel.app)
   - Edite: `intelligestor-backend-main/app/config/settings.py`
   - Adicione a URL em `ALLOWED_ORIGINS`
   - Commit e push

---

## 🐛 SE DER ERRO:

### "Build failed"
```powershell
npm run build
```
Se funcionar local, é problema de config na Vercel.

### "Authentication failed"
Você precisa de um Personal Access Token (veja acima).

### "Cannot connect to API"
Verifique se o backend está funcionando:
https://intelligestor-backend.onrender.com/health

---

## 📚 DOCUMENTAÇÃO COMPLETA:

Veja: `COMO_FAZER_DEPLOY.md` (instruções detalhadas passo a passo)

---

## ⏱️ TEMPO TOTAL: ~10 minutos

✨ Seu app estará no ar! 🎉
