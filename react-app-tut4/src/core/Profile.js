
import Nav from "../utils/Nav";
import Footer from "../utils/Footer";
function Home() {
  return (
    <div>
      <Nav></Nav>

      <div class="flex items-center h-screen w-full justify-center">
        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <img
                class="w-32 h-32 rounded-full mx-auto"
                src="https://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png"
                alt="John Doe"
              />
            </div>
            <div class="p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                Joh Doe
              </h3>
              <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
              </div>
              <table class="text-xs my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      Address
                    </td>
                    <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">+977 1212121212</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">john@exmaple.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
export default Home;
