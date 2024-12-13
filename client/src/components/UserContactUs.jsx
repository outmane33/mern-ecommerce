import { Accordion, Breadcrumb, Label } from "flowbite-react";

export default function UserContactUs() {
  return (
    <div className="w-full">
      {/* banner  section */}
      <div className="flex justify-center items-center relative mx-5 md:mx-7 lg:mx-9 xl:mx-12">
        <div className="max-w-[1700px] w-full my-16 relative  h-[300px] lg:h-[400px]">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>

          {/* Image */}
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/contact-us-hero-image.webp"
            alt=""
            className="rounded-3xl  h-[300px] lg:h-[400px] w-full object-cover"
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-3xl font-bold">
            <p className="pb-6">Contact Us</p>
            <Breadcrumb
              aria-label="Default breadcrumb example"
              className="text-white"
            >
              <Breadcrumb.Item href="#">
                <p className="text-white">Home</p>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" className="text-white">
                <p className="text-white">CONTACT US</p>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      {/* contact */}
      <div className="flex flex-col lg:flex-row  gap-10 py-10 max-w-7xl  pb-28 mx-10 xl:mx-auto md:mx-10 lg:mx-auto lg:px-10">
        {/* left */}
        <div className="w-full flex-1 flex flex-col gap-5">
          <p className="text-2xl font-bold">Get in touch</p>
          <p className="text-gray-500 lg:text-lg text-base">
            Blandit at maecenas dui sed amet sit enim vitae. Amet purus dictum
            urna sagittis dignissim.At fermentum nisl ullamcorper orci.
          </p>
          <form className="flex flex-col gap-5">
            <div className="flex gap-5 w-full ">
              <div className="flex flex-col flex-1">
                <Label
                  htmlFor="default-search"
                  className="text-[#989d91] text-lg"
                >
                  Your Name
                </Label>
                <input
                  type="text"
                  className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Your Email
                </Label>
                <input
                  type="text"
                  className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Label
                className="text-[#989d91] text-lg"
                htmlFor="default-search"
              >
                Subject
              </Label>
              <input
                type="text"
                className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col">
              <Label
                className="text-[#989d91] text-lg"
                htmlFor="default-search"
              >
                Your Message
              </Label>

              <textarea
                className="w-full  border-[3px] border-gray-100 rounded-2xl p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200 resize-none"
                rows={4}
              />
            </div>
            <button className="bg-[#264c4f] text-white px-5 lg:px-10 py-3 lg:py-4 rounded-full w-fit text-base lg:text-lg">
              Send Message
            </button>
          </form>
        </div>
        {/*     right */}
        <div className="flex-1 flex flex-col  gap-5 text-center lg:text-left">
          <p className="text-2xl font-bold ">Furniture store & showrooms</p>
          <p className="text-gray-500 lg:text-lg text-base">
            Et adipiscing mattis egestas mi placerat duis congue id. Scelerisque
            integer pulvinar justo sed egetpretium ipsum id faucibus euismod
          </p>
          <div className="w-full h-60 border rounded-2xl"></div>
          <div className="flex md:flex-row flex-col gap-5 justify-between ">
            <div>
              <p className="font-semibold lg:text-xl text-lg">Address</p>
              <p className="text-gray-700 te">7914 Lees Creek</p>
              <p className="text-gray-700">St. Dayton, OH 45420</p>
            </div>
            <div>
              <p className="font-semibold lg:text-xl text-lg">Phone</p>
              <p className="text-gray-700">(437) 402-2459</p>
              <p className="text-gray-700">(928) 630-9272</p>
            </div>
            <div>
              <p className="font-semibold lg:text-xl text-lg">Email</p>
              <p className="text-gray-700">bziouioutmane@gmail.com </p>
              <p className="text-gray-700">bziouioutman@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* questions */}
      <div className="w-full bg-[#eef3f6] pb-10 ">
        <div className="flex flex-col gap-10 py-10 max-w-7xl mx-auto">
          {/* Frequently section */}
          <div className="w-full text-center lg:text-left mx-5">
            <div className="flex flex-col gap-4">
              <p className="lg:text-3xl text-2xl font-bold">
                Frequently asked questions
              </p>
              <p className="text-gray-500 lg:text-lg text-base">
                Donec et odio pellentesque diam volutpat commodo amet
                consectetur
                <br />
                adipiscing elit ut aliquam purus vitae et leo duis ut diam quam.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 ">
            {/* left */}
            <div className="flex-1 mx-5">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/contact-us-faq-image.webp"
                alt=""
                className="lg:h-[800px] h-[350px] w-full lg:w-auto rounded-3xl"
              />
            </div>
            {/* right */}
            <div className="max-w-2xl w-full px-5 mx-auto">
              <Accordion collapseAll id="panel">
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Can I order by telephone?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Et adipiscing mattis egestas mi placerat duis congue id.
                      Scelerisque integer pulvinar justo sed egetpretium ipsum
                      id faucibus euismod empor sagittis facilisis tristique.
                      Egestas massa purus vel at consectetur convallis cras
                      imperdiet.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Magna ac placerat vestibulum lectus mauris ultrices eros
                      in cursus. Arcu non odio euismod lacinia at quis risus.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <div className="w-full bg-[#eef3f6] h-[30px] border-none "></div>
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Do you sell gift cards?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Quisque egestas diam in arcu. Pretium vulputate sapien nec
                      sagittis aliquam. Magna fermentum iaculis eu non diam
                      phasellus vestibulum lorem sed. Viverra mauris in aliquam
                      sem fringilla ut morbi tincidunt augue.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <div className="w-full bg-[#eef3f6] h-[30px] border-none "></div>
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Can I order catalog products online?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Tempus iaculis urna id volutpat. Vestibulum lorem sed
                      risus ultricies tristique nulla aliquet enim. Sem
                      fringilla ut morbi tincidunt.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Tincidunt dui ut ornare lectus sit. Ut sem viverra aliquet
                      eget sit amet tellus cras.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <div className="w-full bg-[#eef3f6] h-[30px] border-none "></div>
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Who can answer my warranty questions?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Urna cursus eget nunc scelerisque viverra mauris. Ut
                      pharetra sit amet aliquam id. Et odio pellentesque diam
                      volutpat commodo.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Maecenas pharetra convallis posuere morbi leo urna. Arcu
                      non odio euismod lacinia at quis risus. Magna ac placerat
                      vestibulum lectus mauris ultrices eros in cursus.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <div className="w-full bg-[#eef3f6] h-[30px] border-none "></div>
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Arcu non odio euismod lacinia at quis?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Et malesuada fames ac turpis egestas. Ultricies mi quis
                      hendrerit dolor magna eget est lorem ipsum. Nulla facilisi
                      etiam dignissim diam quis enim.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Tellus pellentesque eu tincidunt tortor aliquam nulla
                      facilisi cras fermentum. Ipsum faucibus vitae aliquet nec
                      ullamcorper sit amet risus nullam. Ultricies tristique
                      nulla aliquet enim tortor at auctor.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <div className="w-full bg-[#eef3f6] h-[30px] border-none "></div>
                <Accordion.Panel>
                  <Accordion.Title id="title">
                    Magna ac placerat vestibulum?
                  </Accordion.Title>
                  <Accordion.Content id="content">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Ultricies mi quis hendrerit dolor magna eget est lorem
                      ipsum. Nulla facilisi etiam dignissim diam quis enim.
                      Tellus pellentesque eu tincidunt tortor aliquam nulla
                      facilisi cras fermentum.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Ipsum faucibus vitae aliquet nec ullamcorper sit amet
                      risus nullam. Ultricies tristique nulla aliquet enim
                      tortor at auctor.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
