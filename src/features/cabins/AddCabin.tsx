import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button
        size="medium"
        variation="primary"
        onClick={() => setIsOpenModal((show) => !show)}
      >
        Add Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm cancelHandler={setIsOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
