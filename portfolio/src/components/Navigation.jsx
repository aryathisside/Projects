import React, { useEffect } from 'react';

const Navigation = () => {

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-torch');
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <nav>
      <div className="navbar">
        <a href="/" className="arya-box">
          <p>
            <strong>Arya</strong>
          </p>
        </a>
        <ul className="nav__links">
          <li className="nav__item">
            <a href="/work">Work</a>
          </li>
          <li className="nav__item">
            <a href="/about">About</a>
          </li>
          <li className="nav__item">
            <a href="/thoughts">Thoughts</a>
          </li>
        </ul>
        <button className="theme-toggle" id="themeToggle">
          🌙 Mode
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
