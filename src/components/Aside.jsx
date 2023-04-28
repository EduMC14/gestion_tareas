
import Datetime from './Datetime';

const Aside = () => {
    
  return (
    <div className="div_form">
      <form className='formulario'>
        <h4>Agregar Tarea</h4> 
        
        <h5 className="mt-4">Titulo</h5>
        <input
          id="input_title"
          className="form-control"
          type="text"
          placeholder="Agregar Titulo"
          aria-label="default input example"
        />
        <h5 className="mt-3">Descripcion</h5>
        <textarea
          cols="30"
          rows="10"
          className="form-control text_tarea"
          placeholder="Leave a comment here"
        ></textarea>
        <h5>Entregable</h5>
        <Datetime /> 
        <div className="form-check mt-3 p-0">
          <h5>Status de tu tarea</h5>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                defaultValue="option1"
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Finalizada
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox2"
                defaultValue="option2"
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                En proceso
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox3"
                defaultValue="option3"
              />
              <label className="form-check-label" htmlFor="inlineCheckbox3">
                Retrasada
              </label>
            </div>
          </div>
          <div class="d-grid gap-2">
              <button class="btn btn-success mt-2" type="sucess" name='create task'>Guardar</button>
              
          </div>
        </div>
      </form>
    </div>
  );
}

export default Aside