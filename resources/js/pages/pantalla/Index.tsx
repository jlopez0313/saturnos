import EmptyLayout from '@/layouts/EmptyLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import styles from '/css/pantalla.module.scss';

declare namespace JSX {
    interface IntrinsicElements {
        marquee: any;
    }
}

export default function Index({ auth, marquesina }: any) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const width = el.offsetWidth;
            const speed = 40; // píxeles por segundo
            const newDuration = width / speed;
            setDuration(newDuration);
        }
    }, []);

    return (
        <EmptyLayout>
            <Head title="Pantalla" />

            <div className={styles['turnero']}>
                <div className={styles['main-content']}>
                    <div className={styles['image-section']}>
                        <header className={styles['header']}>
                            <div className={styles['left-box']}>
                                <div className={styles['info-box']}>
                                    <img className={styles['icono']} src="images/theme/reloj.png" alt="Imagen de: reloj" />
                                    <div>
                                        <span className={styles['label']}>HORA:</span>
                                        <span id="hora" className={styles['value']}>
                                            05:14 PM
                                        </span>
                                    </div>
                                </div>
                                <div className={styles['info-box']}>
                                    <img className={styles['icono']} src="images/theme/calendario.png" alt="Imagen de: calendario" />
                                    <div>
                                        <span id="dia" className={styles['label']}>
                                            MIÉ
                                        </span>
                                        <span id="fecha" className={styles['value']}>
                                            Jul · 23
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['right-box']}>
                                <div className={styles['logo-box']}>
                                    <img className={styles['logo']} src="images/theme/logo-gobernacion.png" alt="Imagen de: logo de gobernacion" />
                                </div>
                            </div>
                        </header>
                        <div className={styles["box"]} id="box">
                            <div id="box-imagen">
                                <img src="https://turnero.scafv.com/images/imagen1.png" alt="Imágenes de: Carrusel de imágenes informativas" />
                            </div>
                        </div>
                    </div>
                    <div className={styles['turnos-section']}></div>
                </div>

                <footer>
                    <marquee className={styles['scrolling-text']}>{marquesina.marquesina}</marquee>
                </footer>
            </div>
        </EmptyLayout>
    );
}
