/** Logo Hopla. : l'icône et le nom, avec le point de marque en couleur primaire. */
export function Marque() {
  return (
    <div className="marque pousse">
      <img src="/icone.svg" width={36} height={36} alt="" />
      <span className="marque__nom">Hopla<span className="marque__point" aria-hidden="true" /></span>
    </div>
  );
}
