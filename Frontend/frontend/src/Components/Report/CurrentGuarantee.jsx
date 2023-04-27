import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
import Service from "../../Services/Service";
import toast, { Toaster } from "react-hot-toast";


export default function CurrentGuarantee({ fy, qt }) {
  const [message, setMessage] = useState("");
  const handleTextUpdate = (current) => {
    addTitle(current);
  };

  const handleTextUpdates = (current) => {
    addGuarantees(current);
  };

  function currentReportPost(e) {
    e.preventDefault();
    const data = {
      ReportFYQuarter: qt,
      ReportFY: fy,
      ReportSectionContent: cartTitle,
      ReportSectionTitle: guaranteeStore,
    };
    Service.postGuarantee(data)
      .then((response) => {
        // setMessage(response?.data?.message)
        toast.success(response?.data?.message, {
          duration: 4000,
          position: "bottom-right",
          // Styling
          style: {},
          className: "",
          icon: "👏",
          iconTheme: {
            primary: "green",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      })
      .catch((error) => {
        if (error?.status !== "200") {
          setMessage(`Failed to post ${error?.message}`);
        }
      });
  }

  const { addTitle, cartTitle, guaranteeStore, addGuarantees } =
    useContext(TitleContext);

  return (
    <React.Fragment>
      <Container>
      <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid green",
              padding: "8px",
              color: "green",
            },
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            marginLeft: "",
          }}
        >
          <Editable
            text={cartTitle}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleTextUpdate}
          />
        </p>

        <div className="pt-1">
          <p
            style={{
              fontWeight: "",
              marginLeft: "",
            }}
          >
            <Editable
              text={guaranteeStore}
              editButtonStyle={{ lineHeight: "unset" }}
              editButton
              editControlButtons
              editControls
              placeholder="Type here"
              cb={handleTextUpdates}
            />
          </p>
          <button onClick={currentReportPost} className="bg-success text-light py-1" >Save</button>
          <p className="text-secondary">{message}</p>
        </div>
      </Container>
    </React.Fragment>
  );
}
