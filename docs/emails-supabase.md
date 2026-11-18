# Modèles d'e-mails Supabase (en français, design system Hopla)

À coller dans Supabase : Authentication, Emails, onglet Templates. Envoi par le SMTP Gmail de hopla.news@gmail.com.

Les couleurs, rayons et typographies reprennent les tokens du DS (thème clair) en valeurs, car les clients mail ne lisent pas les variables CSS :
`surface-0` #F4F5FA, `surface-1` #FFFFFF, `line` #DCE0EE, `ink` #1A1D3A, `ink-muted` #5A6080, `primary` #4B3FD1, `primary-strong` #362BA8 ;
`radius-lg` 20 px (carte), `radius-md` 14 px (bouton), `radius-sm` 10 px (logo) ; Fredoka pour les titres, Lexend pour le texte (Arial si la police manque).
Le bouton reprend `hp-btn--primary` (ombre basse de 3 px en `primary-strong`), la carte `hp-card` (liseré bas de 2 px en `line`).
Chaque e-mail donne le lien et le code à 8 chiffres (`{{ .Token }}`, longueur réglée dans Supabase, Sign In / Providers, Email) : sur iPhone et iPad, l'app installée ne reçoit pas les liens (ils s'ouvrent dans Safari), le parent saisit donc le code dans l'app.
Le logo est servi par l'app : `{{ .SiteURL }}/icone-192.png`.

## Magic Link

Sujet : `Votre lien de connexion à Hopla`

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5FA">
  <tr><td align="center" style="padding:24px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
      <tr><td style="padding:0 4px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:8px"><img src="{{ .SiteURL }}/icone-192.png" width="32" height="32" alt="" style="display:block;border-radius:10px"></td>
          <td style="font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:22px;font-weight:600;color:#1A1D3A">Hopla<span style="color:#4B3FD1">.</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#FFFFFF;border-radius:20px;border-bottom:2px solid #DCE0EE;padding:24px">
        <p style="margin:0 0 12px;font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;font-weight:600;color:#1A1D3A">Votre lien de connexion</p>
        <p style="margin:0 0 12px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Bonjour,</p><p style="margin:0 0 12px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Cliquez sur le bouton pour vous connecter à Hopla. Le lien et le code sont valables une heure et ne servent qu’une fois.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr>
          <td style="background:#4B3FD1;border-radius:14px;border-bottom:3px solid #362BA8">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:15px 20px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:16px;line-height:18px;font-weight:600;color:#FFFFFF;text-decoration:none">Me connecter</a>
          </td>
        </tr></table>
        <p style="margin:16px 0 8px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Ou saisissez ce code dans Hopla (indispensable si l’app est installée sur iPhone ou iPad) :</p>
        <p style="margin:0;display:inline-block;padding:10px 16px;background:#ECEEF5;border-radius:14px;font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:28px;line-height:32px;font-weight:600;letter-spacing:6px;color:#1A1D3A">{{ .Token }}</p>
      </td></tr>
      <tr><td style="padding:16px 4px 0;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#5A6080">
        Vous n’avez rien demandé ? Ignorez ce message : sans clic sur le lien, rien ne se passe.<br><br>Hopla, conçu d’après les programmes officiels de l’Éducation nationale.
        <a href="{{ .SiteURL }}/confidentialite" style="color:#4B3FD1">Confidentialité</a>
      </td></tr>
    </table>
  </td></tr>
</table>
```

## Confirm signup

Sujet : `Bienvenue sur Hopla : confirmez votre adresse`

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5FA">
  <tr><td align="center" style="padding:24px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
      <tr><td style="padding:0 4px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:8px"><img src="{{ .SiteURL }}/icone-192.png" width="32" height="32" alt="" style="display:block;border-radius:10px"></td>
          <td style="font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:22px;font-weight:600;color:#1A1D3A">Hopla<span style="color:#4B3FD1">.</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#FFFFFF;border-radius:20px;border-bottom:2px solid #DCE0EE;padding:24px">
        <p style="margin:0 0 12px;font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;font-weight:600;color:#1A1D3A">Bienvenue sur Hopla.</p>
        <p style="margin:0 0 12px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Bonjour,</p><p style="margin:0 0 12px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Confirmez votre adresse pour ouvrir votre espace parent et créer les profils de vos enfants.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr>
          <td style="background:#4B3FD1;border-radius:14px;border-bottom:3px solid #362BA8">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:15px 20px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:16px;line-height:18px;font-weight:600;color:#FFFFFF;text-decoration:none">Confirmer mon adresse</a>
          </td>
        </tr></table>
        <p style="margin:16px 0 8px;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1A1D3A">Ou saisissez ce code dans Hopla (indispensable si l’app est installée sur iPhone ou iPad) :</p>
        <p style="margin:0;display:inline-block;padding:10px 16px;background:#ECEEF5;border-radius:14px;font-family:'Fredoka','Lexend',Arial,Helvetica,sans-serif;font-size:28px;line-height:32px;font-weight:600;letter-spacing:6px;color:#1A1D3A">{{ .Token }}</p>
      </td></tr>
      <tr><td style="padding:16px 4px 0;font-family:'Lexend',Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#5A6080">
        Vous n’avez rien demandé ? Ignorez ce message : aucun compte ne sera ouvert sans clic sur le lien.<br><br>Hopla, conçu d’après les programmes officiels de l’Éducation nationale.
        <a href="{{ .SiteURL }}/confidentialite" style="color:#4B3FD1">Confidentialité</a>
      </td></tr>
    </table>
  </td></tr>
</table>
```
