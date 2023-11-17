import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';
import logo from '~images/logo.png';
import burgerClose from '~icons/nav/burgerClose.svg';
import burgerOpen from '~icons/nav/burgerOpen.svg';
import arrows from '~icons/nav/arrows.svg';
import user from '~icons/nav/user.svg';
import star from '~icons/nav/star.svg';
import padlock from '~icons/nav/padlock.svg';
import handshake from '~icons/nav/handshake.svg';

const NavBar = () => {
	const [show, setShow] = useState(false);
	const classShow = show ? styles.show : '';
	const handleShow = () => {
		setShow(!show);
	};
	return (
		<aside className={`${styles.aside} ${classShow}`}>
			<div className={styles.containerLogo}>
				{show ? (
					<img
						src={burgerOpen}
						onClick={handleShow}
						className={styles.burger}
					/>
				) : (
					<img
						src={burgerClose}
						onClick={handleShow}
						className={styles.burger}
					/>
				)}
				<img src={logo} alt='logo' className={styles.logo} />
			</div>
			<div className={styles.containerProfile}>
				<img
					src='data:image/jpeg;base64,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'
					alt='logo'
					className={styles.imgProfile}
				/>
				<div className={styles.containerProfileChild}>
					<h5>Gersom</h5>
					{show && <span>gersom@gmail.com</span>}
					<div className={styles.containerHandshake}>
						<img src={handshake} />
						<span>Cuidador</span>
					</div>
				</div>
			</div>
			<nav className={styles.nav}>
				<ul className={styles.ul}>
					<Link to='/dashboard' className={styles.linkContainer}>
						<img src={arrows} />
						{show && <li>Ofertas</li>}
					</Link>
					<Link to='/dashboard' className={styles.linkContainer}>
						<img src={star} />
						{show && <li>Mis clientes</li>}
					</Link>
					<Link to='/dashboard' className={styles.linkContainer}>
						<img src={user} />
						{show && <li>Perfil</li>}
					</Link>
					<Link to='/dashboard' className={styles.linkContainer}>
						<img src={padlock} />
						{show && <li>Cerrar sesión</li>}
					</Link>
				</ul>
			</nav>
		</aside>
	);
};

export default NavBar;
