import { height, width } from "dom7";
import React from "react"
import { Container } from "reactstrap";

const Loader = ({loaderColor}) => {
    var className = "text-center";
    const styleLoader = {
        width: '100%',
        height: '100%'
    };
    if (loaderColor)
        className += ` ${loaderColor}`;
    return (
        <React.Fragment>
            <Container fluid>
                <section className={className} style={styleLoader}>
                    <span className="bx bx-loader-alt bx-spin display-1"></span>
                </section>
            </Container>
        </React.Fragment>
    );
}

export default Loader;