import React, { useState, useMemo } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    SafeAreaView, 
    Dimensions, 
    Switch, 
    Alert, 
    Image, 
    TextInput 
} from 'react-native';

// =================================================================
// 1. CONSTANTS & THEME
// =================================================================

const { width } = Dimensions.get('window');

// --- Color Palette ---
const ACCENT_COLOR = '#388e3c'; // Professional Green
const DARK_COLOR = '#1d1d1f'; // Near Black
const LIGHT_COLOR = '#ffffff'; // White
const GRAY_BG = '#f5f5f7'; // Light Gray Background

// =================================================================
// 2. DATA STRUCTURES & TYPES
// =================================================================

type Course = {
    id: string;
    title: string;
    purpose: string;
    content: string;
    price: number;
    category: 'Learnership' | 'ShortSkill';
    // Use an optional property for the local image key if it exists
    imageLocalKey?: keyof typeof LOCAL_IMAGES; 
    // Fallback for remote images or placeholders
    imageUri?: string; 
};

// IMPORTANT: These files MUST exist in the same directory as this component file
const LOCAL_IMAGES = {
    'child_minding': require('./child_minding.webp'), // Mapped to course ID
    'sewing': require('./sewing.jpeg'), // Mapped to course ID
    'life_skills': require('./life_skils.webp'), // Mapped to course ID
    'landscaping': require('./Landscaping.webp'), // Mapped to course ID
    'grass': require('./garden_maintenance.webp'), // Using a generic key for garden_maintenance
    'first_aid': require('./first_aid.webp'), // Mapped to course ID
    'cooking': require('./cooking.webp'), // Mapped to course ID
};

type PageName = 'Home' | 'Learnerships' | 'ShortSkills' | 'Enquiry' | 'Contact' | 'About';

// --- Global Data Structure for Courses (Updated to use imageLocalKey) ---
const ALL_COURSES: Course[] = [
    // Learnerships (6 Months) - R1500
    { id: 'first_aid', title: 'First Aid', purpose: 'To provide first aid awareness and basic life support', content: 'Wounds and bleeding, Burns and fractures, Emergency scene management, Cardio-Pulmonary Resuscitation (CPR), Respiratory distress (e.g., choking, blocked airway).', price: 1500, category: 'Learnership', imageLocalKey: 'first_aid', imageUri: 'https://via.placeholder.com/300x150/388e3c/ffffff?text=First+Aid+Course' },
    { id: 'sewing', title: 'Sewing', purpose: 'To provide alteration and new garment tailoring services', content: 'Types of stitches, Threading a sewing machine, Sewing buttons, zips, hems and seams, Alterations, Designing and sewing new garments.', price: 1500, category: 'Learnership', imageLocalKey: 'sewing', imageUri: 'https://via.placeholder.com/300x150/1d1d1f/ffffff?text=Sewing+Course' },
    { id: 'life_skills', title: 'Life Skills', purpose: 'To provide skills to navigate basic life necessities', content: 'Opening a bank account, Basic labour law (know your rights), Basic reading and writing literacy, Basic numeric literacy.', price: 1500, category: 'Learnership', imageLocalKey: 'life_skills', imageUri: 'https://via.placeholder.com/300x150/388e3c/ffffff?text=Life+Skills+Training' },
    { id: 'landscaping', title: 'Landscaping', purpose: 'To provide landscaping services for new and established gardens', content: 'Indigenous and exotic plants and trees, Fixed structures (fountains, benches, etc.), Balancing of plants and trees in garden, Aesthetics of plant shapes and colours, Garden Layout.', price: 1500, category: 'Learnership', imageLocalKey: 'landscaping', imageUri: 'https://via.placeholder.com/300x150/1d1d1f/ffffff?text=Landscaping+Learnership' },
    // Short Skills (6 Weeks) - R750
    { id: 'cooking', title: 'Cooking', purpose: 'To prepare and cook nutritious family meals', content: 'Nutritional requirements, Types of protein, carbs and vegetables, Tasty and nutritious recipes, Preparation and cooking of meals.', price: 750, category: 'ShortSkill', imageLocalKey: 'cooking', imageUri: 'https://via.placeholder.com/300x150/388e3c/ffffff?text=Cooking+Skills' },
    { id: 'child_minding', title: 'Child Minding', purpose: 'To provide basic child and baby care', content: 'Birth to six-month old baby needs, seven-month to one year old needs, Toddler needs, Educational toys.', price: 750, category: 'ShortSkill', imageLocalKey: 'child_minding', imageUri: 'https://via.placeholder.com/300x150/1d1d1f/ffffff?text=Child+Minding+Class' },
    { id: 'garden_maintenance', title: 'Garden Maintenance', purpose: 'To provide basic knowledge of watering, pruning and planting in a domestic garden', content: 'Water restrictions, watering requirements, Pruning and propagation of plants, Planting techniques for different plant types.', price: 750, category: 'ShortSkill', imageLocalKey: 'grass', imageUri: 'https://via.placeholder.com/300x150/388e3c/ffffff?text=Garden+Maintenance' },
];

// =================================================================
// 3. UTILITY FUNCTIONS
// =================================================================

/**
 * Formats a number price into a South African Rand (R) string.
 */
const formatPrice = (price: number): string => {
    return `R${price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// =================================================================
// 4. COMPONENTS - SHARED
// =================================================================

type NavBarProps = {
    currentPage: PageName;
    setCurrentPage: (page: PageName) => void;
};

/**
 * Navigation Bar component with a dropdown menu.
 */
const NavBar = ({ currentPage, setCurrentPage }: NavBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems: { name: string; page: PageName }[] = [
        { name: 'Home', page: 'Home' },
        { name: '6-Months Courses', page: 'Learnerships' },
        { name: '6-Weeks Courses', page: 'ShortSkills' },
        { name: 'Enquiry', page: 'Enquiry' },
        { name: 'Contact Us', page: 'Contact' },
        { name: 'About Us', page: 'About' },
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const handleNavigation = (page: PageName) => {
        setCurrentPage(page);
        setIsMenuOpen(false); // Close menu after selection
    };

    const currentNavName = navItems.find(item => item.page === currentPage)?.name || 'Menu';

    return (
        <View style={styles.navbar}>
            <Text style={styles.brand}>Empowering The Nation</Text>

            {/* Dropdown Button */}
            <TouchableOpacity 
                onPress={toggleMenu} 
                style={[styles.dropdownButton, isMenuOpen && styles.dropdownButtonActive]}
            >
                <Text style={styles.dropdownButtonText}>{currentNavName} {isMenuOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {/* Dropdown Menu (Conditionally Rendered) */}
            {isMenuOpen && (
                <View style={styles.dropdownMenu}>
                    {navItems.map((item) => (
                        <TouchableOpacity
                            key={item.page}
                            style={[
                                styles.dropdownItem,
                                currentPage === item.page && styles.dropdownItemActive
                            ]}
                            onPress={() => handleNavigation(item.page)}
                        >
                            <Text style={[
                                styles.dropdownText,
                                currentPage === item.page && styles.dropdownTextActive
                            ]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

/**
 * Card component for displaying individual course details.
 * **Uses local images first, then remote URI, then a placeholder.**
 */
const CourseCard = ({ course }: { course: Course }) => {
    // 1. Determine if a local image key is provided and exists in LOCAL_IMAGES
    const localImageSource = course.imageLocalKey && LOCAL_IMAGES[course.imageLocalKey] 
        ? LOCAL_IMAGES[course.imageLocalKey] 
        : null;

    // 2. Determine the final image source: Local -> Remote -> Placeholder
    const imageSource = localImageSource 
        ? localImageSource // Use local `require` object
        : course.imageUri 
            ? { uri: course.imageUri } // Use remote URI object
            : null; // Use null to trigger placeholder
    
    return (
        <View style={styles.card}>
            {/* Image Display Section */}
            <View style={styles.imageContainer}>
                {imageSource ? (
                    // Use Image component with the determined source
                    <Image 
                        source={imageSource} 
                        style={styles.courseImage} 
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>
                            {course.title.split(' ').map(w => w[0]).join('')}
                        </Text>
                        <Text style={styles.imagePlaceholderSubText}>
                            [Image Placeholder]
                        </Text>
                    </View>
                )}
            </View>

            <Text style={styles.cardTitle}>{course.title}</Text>
            <Text style={styles.cardSubtitle}>Purpose: {course.purpose}</Text>
            <Text style={styles.cardContent}>Content: {course.content}</Text>
            <Text style={styles.cardPrice}>Fees: {formatPrice(course.price)}</Text>
        </View>
    );
};

// =================================================================
// 5. COMPONENTS - PAGES
// =================================================================

type PageProps = {
    setCurrentPage: (page: PageName) => void;
};

/**
 * Home Page Component.
 */
const HomePage = ({ setCurrentPage }: PageProps) => (
    <View style={styles.pageContent}>
        <View style={[styles.heroSection, { backgroundColor: ACCENT_COLOR }]}>
            <Text style={[styles.heroTitle, { color: LIGHT_COLOR }]}>
                Empowering Lives Through Practical Skills.
            </Text>
            <Text style={[styles.heroSubtitle, { color: LIGHT_COLOR }]}>
                Empowering the Nation transforms lives through practical skills, opening doors to employment and entrepreneurship.
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => setCurrentPage('Learnerships')}>
                <Text style={styles.ctaButtonText}>Explore Courses</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.missionVisionSection}>
            <Text style={styles.sectionTitle}>Our Mission & Vision</Text>
            <View style={styles.mvGrid}>
                <View style={styles.mvCard}>
                    <Text style={[styles.cardTitle, { color: ACCENT_COLOR, textAlign: 'center' }]}>Upskilling Industry</Text>
                    <Text style={styles.mvText}>
                        We focus on upskilling domestic workers and gardeners, creating a user-friendly platform that showcases our business and allows customers to request information and quotes.
                    </Text>
                </View>
                <View style={styles.mvCard}>
                    <Text style={[styles.cardTitle, { color: ACCENT_COLOR, textAlign: 'center' }]}>About Us</Text>
                    <Text style={styles.mvText}>
                        Founded by Precious Radebe in 2022, we offer six-month Learnerships and six-week Short Skills Training Programmes in Johannesburg. Our core mission is to empower individuals who didn't get formal education.
                    </Text>
                </View>
            </View>
        </View>
    </View>
);

/**
 * Learnerships (6 Months) Page Component.
 */
const LearnershipsPage = ({ setCurrentPage }: PageProps) => {
    const courses = ALL_COURSES.filter(c => c.category === 'Learnership');
    return (
        <View style={styles.pageContent}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Six-Month Learnerships</Text>
                <Text style={styles.pageSubtitle}>Detailed, accredited programs to build a comprehensive foundation for a new career.</Text>
            </View>
            <View style={styles.courseSection}>
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </View>
            <TouchableOpacity 
                style={[styles.viewMoreButton]} 
                onPress={() => setCurrentPage('ShortSkills')}
            >
                <Text style={styles.viewMoreButtonText}>View Short Skills Courses →</Text>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Short Skills (6 Weeks) Page Component.
 */
const ShortSkillsPage = ({ setCurrentPage }: PageProps) => {
    const courses = ALL_COURSES.filter(c => c.category === 'ShortSkill');
    return (
        <View style={styles.pageContent}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Six-Week Short Skills Training</Text>
                <Text style={styles.pageSubtitle}>Focused, practical courses designed for quick skill acquisition and immediate employment impact.</Text>
            </View>
            <View style={styles.courseSection}>
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </View>
            <TouchableOpacity 
                style={[styles.viewMoreButton, { backgroundColor: ACCENT_COLOR }]} 
                onPress={() => setCurrentPage('Enquiry')}
            >
                <Text style={styles.viewMoreButtonText}>Request a Final Quote →</Text>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Enquiry and Quote Form Page Component.
 */
const EnquiryPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<{ [id: string]: boolean }>({});

    const toggleCourseSelection = (id: string) => {
        setSelectedCourses(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Calculation Logic using useMemo for efficiency
    const { totalBaseCost, discountPercentage, finalCost, checkedCount } = useMemo(() => {
        let totalBaseCost = 0;
        const checkedCount = Object.keys(selectedCourses).filter(id => selectedCourses[id]).length;

        Object.keys(selectedCourses).forEach(id => {
            if (selectedCourses[id]) {
                const course = ALL_COURSES.find(c => c.id === id);
                if (course) {
                    totalBaseCost += course.price;
                }
            }
        });

        let discountPercentage = 0;
        if (checkedCount === 2) {
            discountPercentage = 5;
        } else if (checkedCount === 3) {
            discountPercentage = 10;
        } else if (checkedCount >= 4) {
            discountPercentage = 15;
        }

        const discountAmount = totalBaseCost * (discountPercentage / 100);
        const finalCost = totalBaseCost - discountAmount;

        return { totalBaseCost, discountPercentage, finalCost, checkedCount };
    }, [selectedCourses]);

    const handleSubmit = () => {
        // 1. Basic Validation
        if (checkedCount === 0) {
            Alert.alert("Selection Required", "Please select at least one course for your quote.");
            return;
        }
        if (!name.trim() || !surname.trim() || !contact.trim() || !email.trim()) {
            Alert.alert("Details Required", "Please fill in your name, surname, contact details, and email to submit the enquiry.");
            return;
        }
        
        // 2. Success Pop-up Notification
        Alert.alert(
            "Enquiry Submitted Successfully! ✅",
            `Thank you, ${name} ${surname}! Your final calculated cost is ${formatPrice(finalCost)}. We have received your enquiry and will contact you at ${contact} or ${email} shortly.`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        // 3. Reset form fields on successful submission
                        setName('');
                        setSurname('');
                        setContact('');
                        setEmail('');
                        setSelectedCourses({});
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.pageContent}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Course Enquiry & Quote</Text>
            </View>
            
            <View style={styles.formContainer}>
                {/* 1. Select Courses Section */}
                <Text style={styles.formSectionTitle}>1. Select Your Courses</Text>
                <View style={styles.selectionGrid}>
                    {ALL_COURSES.map(course => (
                        <View key={course.id} style={styles.checkboxItem}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.checkboxTitle}>{course.title}</Text>
                                <Text style={styles.checkboxPrice}>{formatPrice(course.price)}</Text>
                            </View>
                            <Switch
                                trackColor={{ false: "#767577", true: ACCENT_COLOR }}
                                thumbColor={selectedCourses[course.id] ? LIGHT_COLOR : "#f4f3f4"}
                                // Note: ios_backgroundColor is for iOS devices
                                onValueChange={() => toggleCourseSelection(course.id)}
                                value={selectedCourses[course.id] || false}
                            />
                        </View>
                    ))}
                </View>

                {/* 2. Quote Calculation Section */}
                <Text style={styles.formSectionTitle}>2. Your Quote Calculation</Text>
                <View style={styles.quoteBox}>
                    <View style={styles.quoteRow}>
                        <Text style={styles.quoteLabel}>Courses Selected:</Text>
                        <Text style={styles.quoteValue}>{checkedCount}</Text>
                    </View>
                    <View style={[styles.quoteRow, styles.quoteDivider]}>
                        <Text style={styles.quoteLabel}>Total Base Cost:</Text>
                        <Text style={styles.quoteValue}>{formatPrice(totalBaseCost)}</Text>
                    </View>
                    <View style={styles.quoteRow}>
                        <Text style={styles.quoteLabel}>Multi-Course Discount:</Text>
                        <Text style={[styles.quoteValue, { color: discountPercentage > 0 ? '#d32f2f' : DARK_COLOR }]}>{discountPercentage}%</Text>
                    </View>
                    <View style={[styles.quoteRow, styles.finalCostRow]}>
                        <Text style={styles.finalCostLabel}>FINAL COST:</Text>
                        <Text style={styles.finalCostValue}>{formatPrice(finalCost)}</Text>
                    </View>
                </View>
                <Text style={styles.discountNote}>*Discount applies for selecting 2 (5%), 3 (10%), or 4+ (15%) courses.</Text>

                {/* 3. Contact Details Section */}
                <Text style={styles.formSectionTitle}>3. Your Contact Details</Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="First Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={setSurname}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Contact Number (e.g., 0821234567)"
                    value={contact}
                    onChangeText={setContact}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Enquiry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

/**
 * Contact Us Page Component.
 */
const ContactPage = () => (
    <View style={styles.pageContent}>
        <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Contact Us </Text>
            <Text style={styles.pageSubtitle}>Get in touch with our team for more information.</Text>
        </View>
        <View style={styles.contactGrid}>
            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Call Us</Text>
                <Text style={styles.contactDetail}>+27 11 123 4567</Text>
            </View>
            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Email Us</Text>
                <Text style={styles.contactDetail}>info@empoweringthenation.org</Text>
            </View>
            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Find Us</Text>
                <Text style={styles.contactDetail}>Johannesburg, South Africa</Text>
            </View> {/* <--- FIXED: Removed the extra </Text> tag here */}
        </View>
    </View>
);

/**
 * About Us Page Component.
 */
const AboutPage = () => (
    <View style={styles.pageContent}>
        <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>About Us</Text>
        </View>
        <View style={styles.aboutContainer}>
            <Text style={[styles.cardTitle, { color: ACCENT_COLOR, textAlign: 'center', marginBottom: 15 }]}>
                Empowering The Nation
            </Text>
            <Text style={styles.aboutText}>
                Empowering the Nation is a small-to-mid-size enterprise focused on upskilling domestic workers and gardeners. We aim to provide user-friendly platforms to effectively showcase our business, allow potential customers to request information, and provide quotes for services. Our design choices are motivated by a user-centred approach, keeping our target audience and business goals in mind.
            </Text>
            <Text style={[styles.aboutText, { fontWeight: '600', marginTop: 15 }]}>
                Founded by Precious Radebe in 2022, we offer six-month Learnerships and six-week Short Skills Training Programmes in Johannesburg. The core mission is to empower individuals who didn't get formal education by providing them with marketable skills, helping them find better employment or even start their own small businesses.
            </Text>
        </View>
    </View>
);

// =================================================================
// 6. MAIN APP COMPONENT
// =================================================================

/**
 * Main application container and router.
 */
const App = () => {
    const [currentPage, setCurrentPage] = useState<PageName>('Home');

    const renderPage = () => {
        switch (currentPage) {
            case 'Home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'Learnerships':
                return <LearnershipsPage setCurrentPage={setCurrentPage} />;
            case 'ShortSkills':
                return <ShortSkillsPage setCurrentPage={setCurrentPage} />;
            case 'Enquiry':
                return <EnquiryPage />;
            case 'Contact':
                return <ContactPage />;
            case 'About':
                return <AboutPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <ScrollView contentContainerStyle={styles.container}>
                {renderPage()}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Empowering The Nation. All Rights Reserved.</Text>
            </View>
        </SafeAreaView>
    );
};

// =================================================================
// 7. STYLESHEET
// =================================================================

const styles = StyleSheet.create({
    // --- Global & Layout Styles ---
    safeArea: {
        flex: 1,
        backgroundColor: GRAY_BG,
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: width * 0.05,
        minHeight: '100%',
    },
    pageContent: {
        width: '100%',
    },
    
    // --- Navigation Styles ---
    navbar: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: LIGHT_COLOR,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        zIndex: 10, // Ensure dropdown is above content
    },
    brand: {
        fontSize: 20,
        fontWeight: 'bold',
        color: DARK_COLOR,
        textAlign: 'center',
        paddingVertical: 10,
        marginBottom: 10,
    },
    
    // Dropdown Button
    dropdownButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 15,
        backgroundColor: DARK_COLOR,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdownButtonActive: {
        backgroundColor: ACCENT_COLOR,
    },
    dropdownButtonText: {
        color: LIGHT_COLOR,
        fontSize: 16,
        fontWeight: '700',
    },

    // Dropdown Menu
    dropdownMenu: {
        position: 'absolute',
        top: 110, // Adjusted based on brand and button height
        width: width * 0.9,
        left: width * 0.05,
        backgroundColor: LIGHT_COLOR,
        borderColor: ACCENT_COLOR,
        borderWidth: 2,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        paddingVertical: 5,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemActive: {
        backgroundColor: GRAY_BG,
    },
    dropdownText: {
        fontSize: 16,
        color: DARK_COLOR,
        fontWeight: '500',
    },
    dropdownTextActive: {
        color: ACCENT_COLOR,
        fontWeight: '700',
    },

    // --- Headers & Hero Styles ---
    heroSection: {
        paddingVertical: 40,
        paddingHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 12,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 10,
        color: DARK_COLOR,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        maxWidth: '95%',
        marginBottom: 20,
    },
    pageHeader: {
        paddingVertical: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 5,
        color: DARK_COLOR,
        textAlign: 'center',
    },
    pageSubtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
    },

    // --- Home Page Content Styles ---
    ctaButton: {
        backgroundColor: LIGHT_COLOR,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    ctaButtonText: {
        color: ACCENT_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },
    missionVisionSection: {
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: DARK_COLOR,
        textAlign: 'center',
        marginBottom: 15,
    },
    mvGrid: {
        gap: 15,
    },
    mvCard: {
        backgroundColor: LIGHT_COLOR,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderTopWidth: 4,
        borderTopColor: ACCENT_COLOR,
    },
    mvText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },

    // --- Course Card Styles ---
    courseSection: {
        gap: 20,
        marginBottom: 20,
    },
    card: {
        backgroundColor: LIGHT_COLOR,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: GRAY_BG,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    courseImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GRAY_BG,
    },
    imagePlaceholderText: {
        fontSize: 36,
        fontWeight: '900',
        color: ACCENT_COLOR,
    },
    imagePlaceholderSubText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: DARK_COLOR,
    },
    cardSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: ACCENT_COLOR,
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: DARK_COLOR,
        marginTop: 5,
    },
    viewMoreButton: {
        backgroundColor: DARK_COLOR,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    viewMoreButtonText: {
        color: LIGHT_COLOR,
        fontSize: 16,
        fontWeight: '600',
    },
    
    // --- Enquiry Form Styles ---
    formContainer: {
        backgroundColor: LIGHT_COLOR,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    formSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: DARK_COLOR,
        marginTop: 15,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: ACCENT_COLOR,
        paddingBottom: 5,
    },
    selectionGrid: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 10,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: GRAY_BG,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    checkboxTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: DARK_COLOR,
    },
    checkboxPrice: {
        fontSize: 14,
        color: ACCENT_COLOR,
        fontWeight: '700',
    },
    textInputStyle: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        color: DARK_COLOR,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: ACCENT_COLOR,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: LIGHT_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Quote Calculation Styles
    quoteBox: {
        padding: 15,
        backgroundColor: '#e8f5e9', // Light green shade
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        marginBottom: 10,
    },
    quoteRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    quoteDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 5,
        paddingBottom: 10,
    },
    quoteLabel: {
        fontSize: 16,
        color: DARK_COLOR,
    },
    quoteValue: {
        fontSize: 16,
        fontWeight: '600',
        color: DARK_COLOR,
    },
    finalCostRow: {
        marginTop: 10,
        borderTopWidth: 2,
        borderTopColor: ACCENT_COLOR,
        paddingTop: 10,
    },
    finalCostLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DARK_COLOR,
    },
    finalCostValue: {
        fontSize: 20,
        fontWeight: '900',
        color: ACCENT_COLOR,
    },
    discountNote: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },

    // --- Contact Page Styles ---
    contactGrid: {
        gap: 15,
    },
    contactCard: {
        backgroundColor: LIGHT_COLOR,
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: ACCENT_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DARK_COLOR,
        marginBottom: 5,
    },
    contactDetail: {
        fontSize: 16,
        color: '#555',
    },

    // --- About Page Styles ---
    aboutContainer: {
        backgroundColor: LIGHT_COLOR,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    aboutText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
        textAlign: 'justify',
    },

    // --- Footer Styles ---
    footer: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: DARK_COLOR,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: LIGHT_COLOR,
        fontSize: 12,
    },
});

export default App;