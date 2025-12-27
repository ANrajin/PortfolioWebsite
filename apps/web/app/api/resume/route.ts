import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { getPortfolio } from '@/lib/api';
import { dummyData } from '@/data/dummy';

export async function GET() {
    let data;

    try {
        data = await getPortfolio();
    } catch (error) {
        console.warn('API unavailable, using dummy data:', error);
        data = dummyData;
    }

    if (!data.personalInfo) {
        data = dummyData;
    }

    const { personalInfo, experiences, skills, education, certifications } = data;

    // Create PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Helper function to add text and handle page breaks
    const addText = (text: string, fontSize: number, isBold = false, indent = 0) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = doc.splitTextToSize(text, maxWidth - indent);
        const lineHeight = fontSize * 0.5;

        for (const line of lines) {
            if (yPos > 280) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(line, margin + indent, yPos);
            yPos += lineHeight;
        }
    };

    const addSection = (title: string) => {
        yPos += 5;
        addText(title.toUpperCase(), 12, true);
        doc.setDrawColor(0);
        doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
        yPos += 3;
    };

    // Header - Name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(personalInfo.name, pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(personalInfo.title, pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    // Contact Info
    doc.setFontSize(10);
    const contactInfo = `${personalInfo.email} | ${personalInfo.phone}`;
    doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;

    // Social Links (LinkedIn & GitHub)
    if (personalInfo.socialLinks && personalInfo.socialLinks.length > 0) {
        const socialParts: string[] = [];

        const linkedIn = personalInfo.socialLinks.find(
            (link: { platform: string; url: string }) => link.platform?.toLowerCase() === 'linkedin'
        );
        if (linkedIn?.url) {
            socialParts.push(`LinkedIn: ${linkedIn.url}`);
        }

        const github = personalInfo.socialLinks.find(
            (link: { platform: string; url: string }) => link.platform?.toLowerCase() === 'github'
        );
        if (github?.url) {
            socialParts.push(`GitHub: ${github.url}`);
        }

        if (socialParts.length > 0) {
            doc.setFontSize(9);
            doc.text(socialParts.join(' | '), pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
        }
    }
    yPos += 5;

    // Career Objective / Summary
    addSection('Professional Summary');
    addText(personalInfo.careerObjective, 10);
    yPos += 5;

    // Experience
    if (experiences && experiences.length > 0) {
        addSection('Professional Experience');

        for (const exp of experiences) {
            addText(exp.position, 11, true);
            const dateRange = exp.current
                ? `${formatDate(exp.startDate)} - Present`
                : `${formatDate(exp.startDate)} - ${formatDate(exp.endDate || '')}`;
            addText(`${exp.company} | ${dateRange}`, 10);
            yPos += 2;
            addText(exp.description, 10, false, 5);
            if (exp.technologies && exp.technologies.length > 0) {
                addText(`Technologies: ${exp.technologies.join(', ')}`, 9, false, 5);
            }
            yPos += 5;
        }
    }

    // Skills
    if (skills && skills.length > 0) {
        addSection('Skills');

        const skillCategories = new Map<string, string[]>();
        for (const skill of skills) {
            const category = skill.category || 'Other';
            if (!skillCategories.has(category)) {
                skillCategories.set(category, []);
            }
            skillCategories.get(category)!.push(skill.name);
        }

        for (const [category, skillList] of skillCategories) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            addText(`${categoryName}: ${skillList.join(', ')}`, 10);
        }
        yPos += 5;
    }

    // Education
    if (education && education.length > 0) {
        addSection('Education');

        for (const edu of education) {
            addText(`${edu.degree} in ${edu.field}`, 11, true);
            const eduDates = edu.current
                ? `${edu.startYear} - Present`
                : `${edu.startYear} - ${edu.endYear}`;
            addText(`${edu.institution} | ${eduDates}`, 10);
            if (edu.description) {
                addText(edu.description, 10, false, 5);
            }
            yPos += 5;
        }
    }

    // Certifications
    if (certifications && certifications.length > 0) {
        addSection('Certifications');

        for (const cert of certifications) {
            addText(cert.name, 11, true);
            addText(`${cert.organization} | Issued: ${formatDate(cert.issueDate)}`, 10);
            if (cert.skills && cert.skills.length > 0) {
                addText(`Skills: ${cert.skills.join(', ')}`, 9, false, 5);
            }
            yPos += 3;
        }
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Create filename from name
    const fileName = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;

    return new NextResponse(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        },
    });
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
