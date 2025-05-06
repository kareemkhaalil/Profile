import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 section">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            About <span className="text-[#00CCFF]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-[#00CCFF] mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-2/5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <p className="text-[#E0E0E0] font-medium">
                    Passionate about creating smooth, intuitive mobile
                    experiences
                  </p>
                </div>
              </div>
              <img
                src="https://avatars.githubusercontent.com/u/35874983?s=400&u=ad3946ce5e944537e5ce3c2036176a4c1c972720&v=4"
                alt="Mobile App Developer Working"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-poppins mb-4">
              Mobile App Developer & UI/UX Enthusiast
            </h3>
            <p className="text-[#B0B0B0] mb-6">
              I'm a passionate mobile app developer with over 5 years of
              experience specializing in Flutter and Dart. I create elegant,
              high-performance applications that deliver exceptional user
              experiences across both iOS and Android platforms.
            </p>
            <p className="text-[#B0B0B0] mb-8">
              My approach combines technical expertise with a deep understanding
              of design principles. I believe great apps should be both
              beautiful and functional, with attention to detail that makes
              interactions feel natural and intuitive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <i className="ri-user-3-line text-[#00CCFF] text-xl mr-3"></i>
                <div>
                  <h4 className="text-sm text-[#B0B0B0]">Name</h4>
                  <p>Kareem Khalil</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <i className="ri-mail-line text-[#00CCFF] text-xl mr-3"></i>
                <div>
                  <h4 className="text-sm text-[#B0B0B0]">Email</h4>
                  <p>karem2003.kk@gmail.com</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <i className="ri-map-pin-line text-[#00CCFF] text-xl mr-3"></i>
                <div>
                  <h4 className="text-sm text-[#B0B0B0]">Location</h4>
                  <p>Egypt, Damietta</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <i className="ri-briefcase-line text-[#00CCFF] text-xl mr-3"></i>
                <div>
                  <h4 className="text-sm text-[#B0B0B0]">Experience</h4>
                  <p>3+ Years</p>
                </div>
              </motion.div>
            </div>

            <motion.a
              href="/Kareem_Khalil_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#00CCFF] text-[#121212] font-medium hover:bg-[#33D6FF] transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="ri-download-line mr-2"></i> Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
