import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const MainContainer = (props) => {
  const { children, className } = props;
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default MainContainer;
