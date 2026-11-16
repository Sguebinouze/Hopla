// Installation de Hopla sur l'écran d'accueil : détection de l'appareil et invite d'installation (Android, ordinateur).

export type Plateforme = 'ios' | 'android' | 'autre';

export function plateforme(): Plateforme {
  const ua = navigator.userAgent;
  // iPadOS se présente comme un Mac : on le reconnait à l'écran tactile.
  if (/iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'autre';
}

/** Vrai quand Hopla tourne depuis son icône (app installée), pas dans un onglet. */
export function estInstallee(): boolean {
  return matchMedia('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

interface InviteInstallation extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let invite: InviteInstallation | null = null;

/** À appeler une fois au démarrage : garde l'invite d'installation proposée par le navigateur. */
export function ecouterInstallation(): void {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    invite = e as InviteInstallation;
  });
  window.addEventListener('appinstalled', () => { invite = null; });
}

export const installationDirecte = () => invite !== null;

/** Ouvre l'invite du navigateur ; vrai si la personne a accepté. */
export async function installer(): Promise<boolean> {
  if (!invite) return false;
  await invite.prompt();
  const { outcome } = await invite.userChoice;
  invite = null;
  return outcome === 'accepted';
}
