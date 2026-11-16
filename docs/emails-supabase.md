# Modèles d'e-mails Supabase (en français)

À coller dans Supabase : Authentication, Emails, onglet Templates. Envoi par le SMTP Gmail de hopla.news@gmail.com.

## Magic Link

Sujet : `Votre lien de connexion à Hopla`

```html
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A;max-width:520px">
  <p style="font-size:22px;font-weight:700;color:#4B3FD1;margin:0 0 16px">Hopla</p>
  <p>Bonjour,</p>
  <p>Voici votre lien pour vous connecter à Hopla. Il est valable une heure et ne sert qu’une fois.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:12px 18px;border-radius:12px;background:#4B3FD1;color:#ffffff;font-weight:600;text-decoration:none">Me connecter</a></p>
  <p style="font-size:13px;color:#5B6178">Vous n’avez rien demandé ? Ignorez ce message : sans clic sur le lien, rien ne se passe.</p>
</div>
```

## Confirm signup

Sujet : `Bienvenue sur Hopla : confirmez votre adresse`

```html
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A;max-width:520px">
  <p style="font-size:22px;font-weight:700;color:#4B3FD1;margin:0 0 16px">Hopla</p>
  <p>Bonjour,</p>
  <p>Bienvenue sur Hopla. Confirmez votre adresse pour ouvrir votre espace parent et créer les profils de vos enfants.</p>
  <p><a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:12px 18px;border-radius:12px;background:#4B3FD1;color:#ffffff;font-weight:600;text-decoration:none">Confirmer mon adresse</a></p>
  <p style="font-size:13px;color:#5B6178">Vous n’avez rien demandé ? Ignorez ce message : aucun compte ne sera ouvert sans clic sur le lien.</p>
</div>
```
