import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";

const YourComponent = () => {
  return (
    <div>
      <Header />
      <div className="h-96 relative">
        <img
          className="w-full h-full"
          src="https://www.shannonspringshotel.com/wp-content/uploads/2020/06/shopping-shannon-springs-2.jpg"
          alt=""
        />
        <div className="absolute h-full w-full bg-black opacity-60 top-0"></div>
        <div className="bottom-0 absolute w-full pb-10">
          <h2 className="text-4xl font-bold text-center">
            Delivery happiness on the go
          </h2>
          <span className="text-2xl font-bold text-center block text-center mt-2.5">
            Happy shopping!
          </span>
        </div>
      </div>
      <div className="w-full max-w-6xl mt-10 mx-auto">
        <div className="mb-10 pt-10">
          <h2 className="text-4xl font-bold text-center mb-10">Our Story</h2>
          <div className="block md:flex text-center md:text-left">
            <p className="md:mr-10">
              In this article, I’d like to reacquaint you with the humble
              workhorse of communication that is the paragraph. Paragraphs are
              everywhere. In fact, at the high risk of stating the obvious, you
              are reading one now. Despite their ubiquity, we frequently neglect
              their presentation. This is a mistake.
            </p>
            <p className="mt-5 md:ml-10 md:mt-0">
              In this article, I’d like to reacquaint you with the humble
              workhorse of communication that is the paragraph. Paragraphs are
              everywhere. In fact, at the high risk of stating the obvious, you
              are reading one now. Despite their ubiquity, we frequently neglect
              their presentation. This is a mistake.
            </p>
          </div>
        </div>
        <div className="mb-10 pt-10">
          <h2 className="text-4xl font-bold text-center mb-10">Our Values</h2>
          <img
            src="https://icms-image.slatic.net/images/ims-web/0d3d43e8-d6de-4424-bab6-88bac82cd11d.png"
            alt=""
          />
        </div>
        <div className="mb-10 pt-10">
          <h2 className="text-4xl font-bold text-center mb-10">Our Promise</h2>
          <div className="block md:flex">
            <div className="md:w-2/4 w-full">
              <img
                className="w-full h-full"
                src="https://s40424.pcdn.co/in/wp-content/uploads/2023/04/what-does-a-business-analyst-do.png"
                alt=""
              />
            </div>
            <div className="w-full md:w-2/4 bg-orange-500">
              <div className="flex px-5 py-3 items-center">
                <img
                  className="h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/512/1/1437.png"
                  alt=""
                />
                <div className="ml-5">
                  <h2 className="text-xl font-bold">Best price</h2>
                  <p>
                    ike to reacquaint you with the humble workhorse of communica
                  </p>
                </div>
              </div>
              <div className="flex px-5 py-3 items-center">
                <img
                  className="h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/512/1/1437.png"
                  alt=""
                />
                <div className="ml-5">
                  <h2 className="text-xl font-bold">Best price</h2>
                  <p>
                    ike to reacquaint you with the humble workhorse of communica
                  </p>
                </div>
              </div>
              <div className="flex px-5 py-3 items-center">
                <img
                  className="h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/512/1/1437.png"
                  alt=""
                />
                <div className="ml-5">
                  <h2 className="text-xl font-bold">Best price</h2>
                  <p>
                    ike to reacquaint you with the humble workhorse of communica
                  </p>
                </div>
              </div>
              <div className="flex px-5 py-3 items-center">
                <img
                  className="h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/512/1/1437.png"
                  alt=""
                />
                <div className="ml-5">
                  <h2 className="text-xl font-bold">Best price</h2>
                  <p>
                    ike to reacquaint you with the humble workhorse of communica
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 pt-10">
          <div className="block md:flex items-center">
            <h2 className="text-3xl font-bold w-full md:w-2/6 py-10 text-center">
              Empowering seller <br />
              on Rajdhola
            </h2>
            <span className="w-full md:w-4/6 text-medium block text-center md:text-left">
              In this article, I’d like to reacquaint you with the humble
              workhorse of e to reacquaint you with the humble workhorse of e to
              reacquaint you with the humble workhorse of e to reacquaint you
              with the humble workhorse of e to reacquaint you with the humble
              workhorse of e to reacquaint you with the humble workhorse of e to
              reacquaint you with the humble workhorse of e to reacquaint you
              with the humble workhorse of communication that is the paragraph.
              Paragraphs are everywhere. In fact, at the high risk of stating
              the obvious, you are reading one now. Despite their ubiquity, we
              frequently neglect their presentation. This is a mistake.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YourComponent;
