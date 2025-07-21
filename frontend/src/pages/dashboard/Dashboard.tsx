import '../dashboard/dashboard.css'
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';

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
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>

          <div className="btn-add">
          <Button label='Adicionar'/>
          </div>

        </section>

        <section className='routes'>

        </section>

        <section className="notifications">

        </section>
      </div>

    </div>
  );
}

export default Dashboard;
