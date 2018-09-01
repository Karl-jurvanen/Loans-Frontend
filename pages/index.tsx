import { maat } from "./App";

export default () =>
  <div>
    Tänään on {' ' }
    {new Date().getDate() + '.' }
    {new Date().getMonth() + 1 + '.'}
    {new Date().getFullYear()}

    

    {maat.map(item => <div>{item.name} {item.population} </div>)}
        
  </div>
