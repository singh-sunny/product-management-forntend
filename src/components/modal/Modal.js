import './modal.scss';

const Modal = (props) => {
    return (
      <div className="modal">
        <section className="modal-main">
          {props.children}
        </section>
      </div>
    );
};

export {Modal};