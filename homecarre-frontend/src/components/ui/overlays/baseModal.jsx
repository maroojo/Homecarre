import React from "react";
import { Modal, Image } from "antd";

// Example usage:
// const showModal = () => { setModalVisible(true); };
// const handleCloseModal = () => { setModalVisible(false); };

// return (
//   <ModalTemplate
//     visible={modalVisible}
//     onClose={handleCloseModal}
//     iconModal={`${url}/error.png`}
//     footerButtons={[
//       <button onClick={handleCloseModal}>Close</button>,
//       <button>Confirm</button>,
//     ]}
//   >
//     {content}
//   </ModalTemplate>
// );

const BaseModal = ({
  title,
  visible,
  onClose,
  closable,
  iconModal,
  blurBackground,
  decorate,
  width,
  children,
  footerButtons,
  maskClos,
}) => {
  // ปุ่มจะมี 1 หรือ 2
  // -กำหนดความกว้างของ ปุ่ม จากฝั่งที่เรีกยใช้
  // -ใส่ className="px-{ขนาดที่ต้องการ}"
  if (footerButtons && footerButtons.length > 2) {
    footerButtons = footerButtons.slice(0, 2);
  }

  // Set ปิด Modal จากการกด mask หรือไม่
  if (maskClos === undefined || maskClos === null) {
    maskClos = true;
  }
  // Set การตกแต่ง UI ของ Modal
  if (decorate === undefined || decorate === null) {
    decorate = true;
  }

  return (
    <div>
      {visible && blurBackground && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <Modal
        title={title}
        open={visible}
        onCancel={onClose}
        closable={closable}
        width={width}
        footer={null}
        maskClosable={maskClos}
        centered
        destroyOnHidden
      >
        <div
          className={
            decorate
              ? "flex flex-col justify-center items-center text-center h-full"
              : "h-full"
          }
        >
          <Image
            src={iconModal}
            alt="Error"
            className={
              iconModal
                ? "my-5 max-w-40 h-auto flex justify-center rounded-full"
                : "hidden"
            }
            preview={false}
          />
          <div className="font-semibold text-xl">{children}</div>
          <div className="flex justify-end gap-4 my-5">
            {footerButtons?.[0] && (
              <div className="py-1 text-primary rounded-full border-primary border-2 cursor-pointer bg-white hover:transform hover:scale-101 hover:ease-in-out">
                {footerButtons[0]}
              </div>
            )}
            {footerButtons?.[1] && (
              <div className="py-1 text-white rounded-full gradient cursor-pointer hover:transform hover:scale-101 hover:transition hover:ease-in-out">
                {footerButtons[1]}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BaseModal;
