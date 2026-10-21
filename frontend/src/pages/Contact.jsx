import { useState } from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { seoPages } from '../seoPages';
import { openWhatsAppInquiry } from '../utils/whatsapp';

export default function Contact() {
	const [sent, setSent] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries());
		openWhatsAppInquiry(data);
		setSent(true);
		form.reset();
	};

	return (
		<>
			<SEO {...seoPages.contact} />
			<PageHero eyebrow="Private Access Placement" title="Contact AcreArch Concierge">
				Begin a secure and discreet conversation with our advisory team.
			</PageHero>
			<section className="contact-layout">
				<aside>
					<span className="eyebrow">Global Advisory</span>
					<h2>Your Mandate, Personally Managed</h2>
					<p>Share your priorities and our concierge will respond within two business hours.</p>
					<p>
						<i className="fa-solid fa-envelope gold" /> <a href="mailto:info@acrearch.com">info@acrearch.com</a>
					</p>
					<p>
						<i className="fa-solid fa-location-dot gold" /> Tower B-516 5th floor Bhutani Techno Park, Sector 127, Noida, UP 201301
					</p>
					<p>
						<i className="fa-solid fa-phone gold" /> +919599275077 / +917704044447
					</p>
					<p>
						<i className="fa-solid fa-phone gold" /> Official: +91 1204126586
					</p>
				</aside>

				<form onSubmit={submit}>
					<div className="form-grid">
						<label>
							Full Name
							<input required name="name" />
						</label>
						<label>
							Email Address
							<input required type="email" name="email" />
						</label>
						<label>
							Telephone
							<input type="tel" name="phone" />
						</label>
						<label>
							Area of Interest
							<select name="interest">
								<option>Property acquisition</option>
								<option>Investment advisory</option>
								<option>Property representation</option>
							</select>
						</label>
					</div>

					<label>
						Private Brief
						<textarea required rows="5" name="message" />
					</label>

					<button className="button navy" type="submit">
						<i className="fa-brands fa-whatsapp" /> Send Inquiry on WhatsApp
					</button>

					{sent && <p className="success">WhatsApp opened with your inquiry. Review the message and tap Send.</p>}
				</form>
			</section>
		</>
	);
}
