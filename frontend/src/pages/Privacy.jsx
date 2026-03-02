import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy - S3N Technologies'
  }, [])

  return (
    <>
      <Navbar />
      <div className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: March 1, 2026</p>

            <section>
              <h2>1. Introduction</h2>
              <p>
                S3N Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the information you provide when you visit our website or contact us through our enquiry form.
              </p>
              <p>
                Please read this policy carefully. By using our website, you agree to the practices described here.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>

              <h3>2.1 Information You Provide</h3>
              <p>
                We only collect information you voluntarily submit through our contact form, which may include:
              </p>
              <ul>
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your company name and phone number (optional)</li>
                <li>The nature of your enquiry or project details</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>
                When you visit our website, basic technical information may be collected automatically, including:
              </p>
              <ul>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on the site</li>
                <li>Referring URL</li>
              </ul>
              <p>
                We do not use advertising cookies or sell your data to any third party.
              </p>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>
                Information you submit through our contact form is used solely to:
              </p>
              <ul>
                <li>Respond to your enquiry</li>
                <li>Discuss your project requirements</li>
                <li>Send a confirmation that we received your message</li>
              </ul>
              <p>
                We do not use your information for unsolicited marketing, and we do not share it with any third parties for commercial purposes.
              </p>
            </section>

            <section>
              <h2>4. How We Share Your Information</h2>
              <p>
                We do not sell, trade, or rent your personal information. We may share it only in the following limited circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> Cloud hosting and email delivery providers used to operate our website and send form acknowledgements</li>
                <li><strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities</li>
                <li><strong>Business Transfers:</strong> If S3N Technologies is involved in a merger or acquisition, your information may be transferred as part of that transaction</li>
              </ul>
            </section>

            <section>
              <h2>5. Cookies</h2>
              <p>
                Our website may use minimal essential cookies required for basic site functionality. We do not use advertising or tracking cookies. You can configure your browser to refuse cookies at any time.
              </p>
            </section>

            <section>
              <h2>6. Data Security</h2>
              <p>
                We take reasonable steps to protect your information, including:
              </p>
              <ul>
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure cloud hosting infrastructure</li>
                <li>Access controls limiting who can view submitted enquiries</li>
              </ul>
              <p>
                No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2>7. Data Retention</h2>
              <p>
                We retain contact form submissions only as long as necessary to address your enquiry or maintain a record of our correspondence. If you wish to have your information removed, please <Link to="/contact">contact us</Link> and we will action it promptly.
              </p>
            </section>

            <section>
              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to:
              </p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Ask us to correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information</li>
                <li><strong>Opt-Out:</strong> Opt out of any future communications from us</li>
              </ul>
              <p>
                To exercise any of these rights, please use our <Link to="/contact">contact form</Link>.
              </p>
            </section>

            <section>
              <h2>9. Children's Privacy</h2>
              <p>
                Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted information through our site, please contact us and we will remove it.
              </p>
            </section>

            <section>
              <h2>10. Third-Party Links</h2>
              <p>
                Our website may contain links to external sites (e.g. LinkedIn). We are not responsible for the privacy practices of those sites and encourage you to review their policies directly.
              </p>
            </section>

            <section>
              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last Updated" date. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please reach out via our <Link to="/contact">contact form</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Privacy
