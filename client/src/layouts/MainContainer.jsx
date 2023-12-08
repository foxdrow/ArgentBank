import Header from "./Header";
import Footer from "./Footer";
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
