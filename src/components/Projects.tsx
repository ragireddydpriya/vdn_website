import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import projects from "@/data/projects.json";

import project1 from "@/assets/projects/project-1.jpg";
import project2 from "@/assets/projects/project-2.jpg";
import project3 from "@/assets/projects/project-3.jpg";
import project4 from "@/assets/projects/project-4.jpg";
import project5 from "@/assets/projects/project-5.jpg";
import project6 from "@/assets/projects/project-6.jpg";
import project7 from "@/assets/projects/project-7.jpg";
import project8 from "@/assets/projects/project-8.jpg";
import project9 from "@/assets/projects/project-9.jpg";
import project10 from "@/assets/projects/project-10.jpg";
import project11 from "@/assets/projects/project-11.jpg";
import project12 from "@/assets/projects/project-12.jpg";

import alohaLogo from "@/assets/clients/aloha.png";
import srinidhiLogo from "@/assets/clients/srinidhi.png";
import candeurLogo from "@/assets/clients/candeur.png";
import risiniaLogo from "@/assets/clients/risinia.png";
import vajraLogo from "@/assets/clients/vajra.png";
import divyashreeLogo from "@/assets/clients/divyashree.png";
import smrLogo from "@/assets/clients/smr.png";
import oghaLogo from "@/assets/clients/ogha.png";
import shivasaiLogo from "@/assets/clients/shivasai.png";
import nebulaLogo from "@/assets/clients/nebula.png";
import makutaLogo from "@/assets/clients/makuta.png";
import arrLogo from "@/assets/clients/arr.png";

const projectImages = [
  project1, project2, project3, project4, project5, project6,
  project7, project8, project9, project10, project11, project12,
];

const clientLogos: Record<string, string> = {
  "Candeur 40": candeurLogo,
  "Aloha Resorts": alohaLogo,
  "Srinidhi Projects": srinidhiLogo,
  "Risinia Builders": risiniaLogo,
  "Vajra Group": vajraLogo,
  "Divya Shree Shakthi": divyashreeLogo,
  "SMR Vinay Highlands": smrLogo,
  "Ogha Wellness": oghaLogo,
  "Shiva Sai Myra": shivasaiLogo,
  "Nebula Avaas": nebulaLogo,
  "Makuta Myspace 1 & 2": makutaLogo,
  "ARR Infracon": arrLogo,
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding" style={{ background: "var(--gradient-sand)" }}>
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Our Work</p>
          <h2 className="section-title">Featured Projects & Prominent Clients</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const logo = project.client ? clientLogos[project.client] : undefined;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.15 }}
                className="glass-card overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden relative flex items-center justify-center bg-white/5">
                  {logo ? (
                    <img
                      src={logo}
                      alt={project.client}
                      loading="lazy"
                      decoding="async"
                      className="w-4/5 h-auto max-h-[80%] object-contain"
                    />
                  ) : (
                    <img
                      src={projectImages[i]}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-display mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
