import React from "react";
import './Footer.css';


const Footer = () => {

    return (
        <div className="footer">
            <div className="sb_footer_section_padding">
                <div className="sb_footer_links">
                    <div className="sb_footer_links_div">
                        <h4>También te puede interesar</h4>
                        <a href="https://www.labnuevoleon.mx/actividades">
                            <p className="links_info">Actividades</p>
                        </a>
                        <a href="https://www.labnuevoleon.mx/espacios">
                            <p className="links_info">Espacios</p>
                        </a>
                        <a href="https://www.labnuevoleon.mx/comunidades">
                            <p className="links_info">Comunidades</p>
                        </a>
                        <a href="https://www.labnuevoleon.mx/documentacion">
                            <p className="links_info">Documentación</p>
                        </a>
                        <a href="https://www.labnuevoleon.mx/blog">
                            <p className="links_info">Blog</p>
                        </a>
                        <a href="https://wiki.labnuevoleon.mx//index.php?title=P%C3%A1gina_principal">
                            <p className="links_info">Wiki</p>
                        </a>
                    </div>
                    <div className="sb_footer_links_div">
                        <h4 className="social_media_title">Síguenos en</h4>
                        <div className="socialmedia">
                            <a href="https://www.facebook.com/labnuevoleon"><img src={"https://www.labnuevoleon.mx/_next/static/media/facebook-footer.aca2cd44.svg"} alt="" /></a>
                            <a href="https://www.instagram.com/labnuevoleon/"  ><img src={"https://www.labnuevoleon.mx//_next/static/media/instagram-footer.453cb6ed.svg"} alt="" /></a>
                            <a href="https://www.youtube.com/@labnuevoleon"><img src={"https://www.labnuevoleon.mx/_next/static/media/youtube-footer.925fb228.svg"} alt="" /></a>
                            <a href="https://twitter.com/labnuevoleon" ><img src={"https://www.labnuevoleon.mx/_next/static/media/twitter-footer.1f6b8d56.svg"} alt="" /></a>
                            <a href="https://flickr.com/photos/labnl"><img src={"https://www.labnuevoleon.mx/_next/static/media/flickr-footer.f5904f34.svg"} alt="" /></a>
                        </div>
                        <div className="goverment_logos">
                            <img alt="Logo Gobierno de Nuevo León" loading="lazy" width="128" height="59" decoding="async" data-nimg="1" src="https://www.labnuevoleon.mx/_next/static/media/gob-footerLogo.73a4b406.svg"  />
                            <img alt="Logo Cultura Nuevo León" loading="lazy" width="118" height="55" decoding="async" data-nimg="1" src="https://www.labnuevoleon.mx/_next/static/media/cultura-footerLogo.4a655c5e.svg" />
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className="sb_footer_below">
                    <div className="sb_footer_copyright">
                        <p>
                            {new Date().getFullYear()} LABNL Lab Cultural Ciudadano. Calle Washington #648, Centro, C.P. 64000 Monterrey, Nuevo León
                        </p>
                    </div>
                    <div className="sb_footer_below_links">
                        <a href="https://www.labnuevoleon.mx/privacidad">Políticas de Privacidad</a>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default Footer;



