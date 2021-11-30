function AppStockAdd() {
  return (
    <main>
      <h1>Ajouter un article</h1>
      <form>
        <label>
          <div>Nom</div>
          <input type="text" />
        </label>
        <label>
          <div>Prix</div>
          <input type="number" />
        </label>
        <label>
          <div>Quantité</div>
          <input type="number" />
        </label>
        <button className="primary">
          <span className="icon-plus"></span>
          Ajouter
        </button>
      </form>
    </main>
  );
}

export default AppStockAdd;
