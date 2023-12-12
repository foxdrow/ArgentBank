import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./MainContainer.scss";
const MainContainer = (props) => {
  const { children, className } = props;
  return (
    <div className={className}>
      <div className={"main-container"}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainContainer;
