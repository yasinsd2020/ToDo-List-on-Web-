import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import uuid from "react-uuid";
import styled from "@emotion/styled";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingBottom: "5%",
  },
};

const Todo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showText, setShowText] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [indexShow, setIndexShow] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  console.log("checking uid");

  const addFunc = () => {
    if (!firstName || !lastName || !email || !password || !phone || !age) {
      alert("fill all input properly");
    } else if (firstName && editShow) {
      setShowText(
        showText.map((elem) => {
          if (elem.id === indexShow) {
            return {
              ...elem,
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              phone: phone,
              age: age,
            };
          }
          return elem;
        })
      );
      setEditShow(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAge("");
      closeModal();
    } else {
      setShowText([
        ...showText,
        {
          id: uuid(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
          age: age,
        },
      ]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAge("");
      closeModal();
    }
  };

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("name"));
    console.log("ssssss", a);
    setShowText(a ? a : []);
  }, []);

  useEffect(() => {
    if (showText.length > 0) {
      localStorage.setItem("name", JSON.stringify(showText));
    }
  }, [showText]);

  const removFunc = (slectedId) => {
    setShowText(showText.filter((item, index) => slectedId !== item.id));

    localStorage.setItem(
      "name",
      JSON.stringify(
        [...showText].filter((item, index) => slectedId !== item.id)
      )
    );
  };

  console.log("this is is ", showText);
  const editFunc = (slectedId) => {
    let b = showText.find((item, index) => {
      return slectedId === item.id;
    });

    setFirstName(b.firstName);
    setLastName(b.lastName);
    setEmail(b.email);
    setPassword(b.password);
    setPhone(b.phone);
    setAge(b.age);
    setEditShow(true);
    setIndexShow(slectedId);
    setIsOpen(true);
  };

  function openModal() {
    setIsOpen(true);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAge("");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{width:'80%'}}>
      <div style={{ marginTop: "10%" }}>
        <style>{`
td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
`}</style>

        <div style={{marginBottom:'1rem'}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: " #00008B",
              justifyContent: "space-around",
              marginBottom:'1rem',
              width:'20%',
              padding:'.7rem'
            }}onClick={openModal}
          >
            <div
              style={{ fontSize: "20px",color:'white', fontWeight:'500', cursor:'pointer'}}
              
            >
              Add User
            </div>
            <AiOutlinePlus style={{ fontSize: "25px",color:'white', fontWeight:'900' }} />
          </div>
          <TableDiv>
            <tbody>
              <TableRow>
                <th>Sr.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone No</th>
                <th>Age</th>
                <th>Update</th>
                <th>Delete</th>
              </TableRow>
              {showText?.map((item, index) => {
                return (
                  <>
                    <TableRow key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.phone}</td>
                      <td>{item.age}</td>
                      <td
                        style={{
                          color: "white",
                          backgroundColor: "#4CAF50",
                          padding: "15px",
                          cursor: "pointer",
                          fontWeight:'600'
                        }}
                        onClick={() => {
                          editFunc(item.id);
                        }}
                      >
                        Update
                      </td>
                      <td
                        style={{
                          backgroundColor: "#f44336",
                          padding: "15px",
                          cursor: "pointer",
                          color: "white",
                          fontWeight:'600'
                        }}
                        onClick={() => {
                          removFunc(item.id);
                        }}
                      >
                        Delete
                      </td>
                    </TableRow>
                  </>
                );
              })}
            </tbody>
          </TableDiv>
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
      
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <RxCrossCircled style={{ fontSize: "40px" }}
            onClick={closeModal}
          />
        </div>
        <ModalMainDiv>
          <FlexDiv>
            <TowInputDiv>
              <div>
                <InputTitle> First Name :</InputTitle>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                ></Input>
              </div>
              <div>
                <InputTitle> Last Name :</InputTitle>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                ></Input>
              </div>
            </TowInputDiv>
            <TowInputDiv>
              <div>
                <InputTitle>Email :</InputTitle>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                ></Input>
              </div>
              <div>
                <InputTitle>Password :</InputTitle>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  type="password"
                ></Input>
              </div>
            </TowInputDiv>
            <TowInputDiv>
              <div>
                <InputTitle>Phone :</InputTitle>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contact No"
                  type="number"
                ></Input>
              </div>
              <div>
                <InputTitle>Age :</InputTitle>
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  type="number"
                ></Input>
              </div>
            </TowInputDiv>

            <EditSubmitButton onClick={() => addFunc()}>
              {editShow ? "UPDATE" : "SUBMIT"}
            </EditSubmitButton>
          </FlexDiv>
        </ModalMainDiv>
      </Modal>
      </div>
    </div>
  );
};

export default Todo;

const ModalMainDiv = styled("div")({});

const FlexDiv = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5%",
});

const TowInputDiv = styled("div")({
  display: "flex",
  width: "1000px",
  justifyContent: "space-around",
  padding: "1rem",
});

const InputTitle = styled("div")({
  fontSize: "18px",
  marginBottom: ".5rem",
});
const Input = styled("input")({
  width: "400px",
  height: "40px",
  fontSize: "17px",
  borderStyle: "none",
  outline: "none",
  border: "1px solid orange",
});

const TableDiv = styled("table")({
  fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: '100%',
});

const TableRow = styled("tr")({});

const EditSubmitButton = styled("div")({
  marginTop: "5rem",
  marginLeft: "1rem",
  backgroundColor: "green",
  padding: ".5em",
  cursor: "pointer",
  width: "400px",
  textAlign: "center",
  fontSize: "20px",
  color: "white",
});
