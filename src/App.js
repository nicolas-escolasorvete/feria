import React, { Component } from "react";
import WheelComponent from "./weel";
import "react-wheel-of-prizes/dist/index.css";
import "./styles.css";
import IMAGES from "./assets";
import Logo from "./assets/logo-horizontal.png";
import TrPortal from "./portal";
import Confetti from "react-confetti";
import emailjs from "emailjs-com";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      show: false,
      email: "",
      emailSent: false,
    };
  }

  getEmail = async () => {
    try {
      const response = await fetch(
        "https://sheet2api.com/v1/o9EZiCzTliju/leads-feria"
      );
      const data = await response.json();
      const email = data[0].email;
      console.log("este es el email para el envio del premio: ", email);
      this.setState({ email });
    } catch (error) {
      console.error(error);
    }
  };

  sendEmail = async () => {
    const { email } = this.state;
    if (!email) {
      console.error("No email found");
      return;
    }

    const serviceId = "service_868fofh";
    const templateId = "template_6rnqza7";
    const userId = "mxT9ULWdZOKiPqppb";

    try {
      await new Promise((resolve) => {
        this.setState({ show: this.state.show }, resolve);
      });

      const templateParams = {
        message_html: `Parabéns! você ganhou um ${this.state.show}!`,
      };

      console.log(templateParams);

      await emailjs.send(
        serviceId,
        templateId,
        { to_name: email, ...templateParams },
        userId
      );
      console.log("Email sent!");
      this.setState({ emailSent: true });
    } catch (error) {
      console.error("Email error:", error);
    }
  };

  onFinished = async (winner) => {
    console.log("Winner:", winner);
    this.setState({ portal: false, show: winner }, async () => {
      await this.getEmail();
      if (!this.state.emailSent) {
        this.sendEmail();
      }
    });
  };

  render() {
    let objIndex = {
      Iphone13promax: 1,
      Bosesurroundspeakers: 2,
      "Samsung65-InchCrystalUHD4KFlatSmartTV": 3,
      "MacBookAirMGN6314”Display,AppleM1ChipWith8-Core": 4,
      KIATELLURIDE2022: 5,
      SAMSUNGFRONTLOADWASHINGMACHINE16KG: 6,
      "10GRAMSGOLDCOIN": 7,
      VOUCHERFORGEORGIAFAMILYTRIPUPTO4: 8,
      AMAZONGIFTVOUCHERWORTH1000AED: 9,
      APPLEAIRPODSPRO: 10,
    };
    const segments = [
      // 10% chance
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "Mercha de la escola",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "20% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "Mentoría con Francisco SantAna",
      "10% Descuento curso o suscripción online",
      "Mercha de la escola",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "Suscripción anual baunilha grátis",
      "10% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online", // 70% chance
      "20% Descuento curso o suscripción online",
      "10% Descuento curso o suscripción online",
      "Curso presencial intensivo gratis",
      "10% Descuento curso o suscripción online",
      "20% Descuento curso o suscripción online", // 30% change
      "Mercha de la escola", // 30% chance
      "10% Descuento curso o suscripción online",
    ];

    const weelColors = () => {
      let arr = [];
      let colors = ["#Ce417d", "#534341", "#d6d3c6", "#93c6c7", "#500878"];
      segments.forEach((el) => {
        let color = colors.shift();
        arr.push(color);
        colors.push(color);
      });

      return arr;
    };
    const segColors = weelColors();

    const onFinished = (winner) => {
      this.setState({ portal: false, show: winner });
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background:
            "linear-gradient(68.6deg, rgb(252, 165, 241) 1.8%, rgb(181, 255, 255) 100.5%)",
          height: "100vh",
          position: "relative",
        }}
      >
        <h1
          style={{
            margin: "auto",
            marginBottom: "20px",
            fontSize: "3.5rem",
            color: "#Ce417d",

            fontWeight: "bold",
          }}
        >
          <i className="titulooo">Gire a roda e ganhe prêmios incríveis.</i>
        </h1>

        <hr />

        {this.state.show && <Confetti width={1080} height={1920} />}
        <div style={{ margin: "auto", marginTop: "30px" }}>
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment={"8"}
            onFinished={this.onFinished}
            primaryColor="gray"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={true}
          />
        </div>

        {this.state.portal ? <TrPortal /> : null}

        {this.state.show && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            />
            <div
              className="box animated-border"
              style={{
                position: "fixed",
                zIndex: 1000,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "15px",
                width: "90%",
                maxWidth: "600px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
            >
              <div className="imageBox">
                <img
                  src={
                    IMAGES[
                      `image${objIndex[this.state.show.split(" ").join("")]}`
                    ]
                  }
                  alt=""
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "15px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h2
                className="titleWin"
                style={{
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                CONGRATULATIONS!!! YOU HAVE WON {this.state.show}
                !!!
              </h2>
              <div className="closeContainer">
                <button
                  className="closepankaj"
                  onClick={() => this.setState({ show: false })}
                  style={{
                    backgroundColor: "#Ce417d",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "1.5em",
                    cursor: "pointer",
                    width: "400px",
                    height: "70px",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </>
        )}

        <img
          className="app-image"
          src={Logo}
          alt="Escola Sorvete Logo"
          style={{
            width: "1100px",
            height: "450px",
            marginTop: "auto",
            position: "relative",
          }}
        />
      </div>
    );
  }
}
