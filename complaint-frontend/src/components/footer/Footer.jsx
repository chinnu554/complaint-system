import "./Footer.css"
function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} College Complaint Platform. All rights reserved.</p>
            <p>Built with ❤️ by Fullness Labs</p>
        </footer>
    );
}

export default Footer;
