export default function Footer() {
  return (
    <footer className="footer">
    <div className="footer__top">
      <div className="footer__brand">
        <div className="footer__logo">LOGO</div>
        <p className="footer__description">Барбершоп “Рыбь”</p>
        <p className="footer__description">Мужские стрижки и бритьё в центре города.</p>
      </div>

      <div className="footer__contacts">
        <h3 className="footer__heading">КОНТАКТЫ</h3>
        <p className="footer__address"> ул. Садовая, 15, Москва</p>
        <p className="footer__phone">📞 +7 (495) 123-45-67</p>
      </div>

      <div className="footer__schedule">
        <h3 className="footer__heading">РЕЖИМ РАБОТЫ</h3>
        <p className="footer__hours">Пн–Пт: 9:00 – 21:00</p>
        <p className="footer__hours">Сб–Вс: 10:00 – 18:00</p>
      </div>
    </div>

    <div className="footer__bottom">
      <span className="footer__copy">© 2026. Все права защищены.</span>
      <a href="#" className="footer__policy">Политика конфиденциальности</a>
    </div>
  </footer>
  );
}
