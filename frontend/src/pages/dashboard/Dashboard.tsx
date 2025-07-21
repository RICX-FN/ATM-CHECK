import '../dashboard/dashboard.css';
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

function Dashboard() {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className='container'>

        <section className='session-agent'>
          <div className="card-agent">
            <h3 className='id-h3'>ID</h3>
            <p className="id-agent">id</p>

            <div className="btn-crud">
              <button title="Editar">
                {(MdOutlineEdit as any)({ size: 18 })}
              </button>
              <button title="Deletar">
                {(RiDeleteBin5Line as any)({ size: 18 })}
              </button>
            </div>
          </div>

          <div className="btn-add">
            <Button label='Adicionar'/>
          </div>
        </section>

        <section className='routes'></section>
        <section className="notifications"></section>
      </div>
    </div>
  );
}

export default Dashboard;