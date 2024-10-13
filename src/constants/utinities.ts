import * as Icon from "@components/icons";
import { Utinity } from "@dts";
import SocialInsuranceLogo from "@assets/logo-social-insurance.png";
import Youtube from "@assets/youtube.png";
import Location from "@assets/location.png";
import Identification from "@assets/id-card.png";
import InternalPhone from "@assets/internal-phone.png";
import SocialInsurranceNumber from "@assets/social-insurance-number.png";
import Benefit from "@assets/benefits.png";
import Renew from "@assets/files.png";

export const APP_UTINITIES: Array<Utinity> = [
    {
        key: "create-schedule-appointment",
        label: "Đặt lịch làm việc",
        icon: Icon.CalendarIcon,
        path: "/create-schedule-appointment",
    },
    {
        key: "info",
        label: "Thông tin - hướng dẫn",
        icon: Icon.BookIcon,
        link: "https://mini.dno.vn/thongtin.html",
    },
    {
        key: "feedback",
        label: "Phản ánh - hiện trường",
        icon: Icon.PenIcon,
        link: "https://phananhht.daknong.gov.vn/",
    },
    {
        key: "goverment",
        label: "Dịch vụ công Đắk Nông",
        icon: Icon.GlobeIcon,
        link: "https://dichvucong.daknong.gov.vn",
    },
    {
        key: "file-search",
        label: "Tra cứu hồ sơ",
        icon: Icon.SearchIcon,
        link: "https://dichvucong.daknong.gov.vn/dichvucong/tracuu",
    },
    {
        key: "goverment",
        label: "Cổng Thông tin điện tử Đắk Nông",
        icon: Icon.GlobeIcon,
        link: "https://daknong.gov.vn/",
    },
];

export const CONTACTS: Array<Utinity> = [
    {
        key: "social-insurance",
        label: "Dịch vụ công BHXH",
        link: "https://dichvucong.baohiemxahoi.gov.vn/#/index",
        iconSrc: SocialInsuranceLogo,
    },
    {
        key: "si-number",
        label: "Đăng ký lịch khám chữa bệnh",
        link: "http://henkham.trungtamytehuyencujut.com.vn/",
        iconSrc: SocialInsurranceNumber,
    },
    {
        key: "internal-number",
        label: "Số điện thoại đường dây nóng",
        link: "https://mini.dno.vn/hotline.html",
        iconSrc: InternalPhone,
    },
    {
        key: "department",
        label: "Bản đồ lượng mưa",
        link: "https://vrain.vn/43/overview?public_map=windy",
        iconSrc: Location,
    },
    {
        key: "update-identification",
        label: "Tra cứu Quy hoạch",
        link: "https://gis.daknong.gov.vn/quyhoachv4.aspx",
        iconSrc: Identification,
    },
    {
        key: "youtube",
        label: "Truyền hình Đắk Nông",
        link: "https://cloudstreamthdn.tek4tv.vn/live/smil:daknong.smil/playlist.m3u",
        iconSrc: Youtube,
    },
];

export const PROCEDURES: Array<Utinity> = [
    {
        key: "renew",
        label: "Gia hạn thẻ BHYT trực tuyến",
        link: "",
        iconSrc: Renew,
    },
    {
        key: "benefit",
        label: "Các chế độ BHXH",
        link: "",
        iconSrc: Benefit,
    },
];
