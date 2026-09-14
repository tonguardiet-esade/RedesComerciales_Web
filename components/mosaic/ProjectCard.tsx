import React from 'react';

interface ProjectCardProps {
  title: string;
  tags?: string[];
  image?: string;
  onClick?: () => void;
  index?: number;
}

const ProjectCard = ({ title, tags = [], image, onClick }: ProjectCardProps) => (
  <div className="group relative scroll-project-card">
    <button
      type="button"
      onClick={onClick}
      data-cursor="view"
      className="w-full text-left cursor-pointer mosaic-focus-ring rounded-sm"
      aria-label={title}
    >
      <div className="aspect-[4/3] overflow-hidden mb-4 relative bg-mosaic-white-100">
        {image ? (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="scroll-parallax-img absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-mosaic-cyan/20 to-mosaic-white-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-mosaic-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      <div className="overflow-hidden">
        <h4 className="mosaic-h4 text-mosaic-black-500 transition-transform duration-500 group-hover:-translate-y-full">
          {title}
        </h4>
        <h4 className="mosaic-h4 text-mosaic-cyan -mt-[1.1em] transition-transform duration-500 translate-y-full group-hover:translate-y-0">
          {title}
        </h4>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {tags.map((tag) => (
            <span key={tag} className="mosaic-label text-mosaic-black-300 text-[10px]">{tag}</span>
          ))}
        </div>
      )}
    </button>
  </div>
);

export default ProjectCard;

