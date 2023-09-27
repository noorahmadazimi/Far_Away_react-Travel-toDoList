import { useState } from "react";

function App() {
  const [item, setItem] = useState([]);

  function deleteItem(id) {
    setItem(items => items.filter((itemss) => itemss.id !== id));
  }
  function updateItem(id) {
    setItem(items => item.map(itms => itms.id === id ?
      { ...itms, packed: !itms.packed } : itms
    ))
  }
  function clearList() {
    const confirm = window.confirm('do you want to clear the list!!');
    if (confirm) setItem([]);

  }
  return <div>
    <Logo />
    <Form setItem={setItem} />
    <PackingList item={item} deleteItem={deleteItem} updateItem={updateItem} clearList={clearList} />
    <Status item={item} />

  </div>

} export default App;

function Logo() {
  return <h1>🌴 Far Away 🛄</h1>
}
function Form({ setItem }) {
  const [desc, setDesc] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!desc) return;

    const data = { desc, quantity, packed: false, id: Date.now() }
    setItem(items => [...items, data]);
    console.log(data);


    setDesc('');
    setQuantity(1);

  }


  return <form className="add-form" onSubmit={handleSubmit}>

    <h3> What do you need for your 😏 Trip ❓</h3>

    <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).
        map((i, index) => (
          <option key={index}>{i}</option>
        ))
      }

    </select>

    <input type="text" placeholder="item..." value={desc} onChange={e => setDesc(e.target.value)} />

    <button>Add</button>
  </form>
}
function PackingList({ item, deleteItem, updateItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;
  if (sortBy === "input") sortedItem = item;
  if (sortBy === "description") sortedItem = item.slice().sort((a, b) => a.desc.localeCompare(b.desc));
  if (sortBy === "packed") sortedItem = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return <div className="list">
    <ul>
      {sortedItem.map((itm, index) => <Item item={itm} deleteItem={deleteItem} updateItem={updateItem} />)}
    </ul>

    <div className="actions">
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="input"> Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed"> Sort by pack status</option>
      </select>
      <button onClick={clearList}>Clear List</button>
    </div>
  </div>

}

function Item({ item, deleteItem, updateItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => updateItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.desc}</span>
      <button onClick={() => deleteItem(item.id)}>🔴</button>
    </li>
  )
}
function Status({ item }) {
  if (!item.length) return (<p className="stats"><emp> Start adding some item into your Packing List 🚀 🚀</emp></p>);
  const numberOfstate = item.length;
  const numberOfPacked = item.filter((item) => item.packed).length;
  const packedAverage = Math.round(numberOfPacked / numberOfstate * 100);
  return <div>
    <footer className="stats">
      <em>
        {packedAverage === 100 ? 'You got everuthing! Ready to go ✈️ ✈️' :
          `🛄 You have ${numberOfstate} item on your list ,  and you already packed ${numberOfPacked} (${packedAverage}%)`}
      </em>
    </footer>
  </div>
}