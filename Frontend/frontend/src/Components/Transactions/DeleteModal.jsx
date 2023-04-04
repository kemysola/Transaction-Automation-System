import {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Icon = () => null;

export default function deleteModal(props) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(false);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Open delete confirmation dialog
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete repository</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-dialog-content">
            <div className="section-message">
              <div className="section-message-icon">
                <Icon />
              </div>
              <div className="section-message-content">
                <h4 className="section-message-title">This repository is related to other repositories</h4>
                <p>Disk space will not be cleared until all are deleted.</p>
                <Button variant="link" href="http://example.com">View related repositories</Button>
              </div>
            </div>
            <p>
              Are you sure you want to delete <b>test-repo</b>? This will cause a permanent loss of all its contents.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteClick} id="confirm-delete-repository-button">
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCancelClick} id="cancel-delete-repository-button">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
