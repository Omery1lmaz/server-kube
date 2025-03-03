import { body } from "express-validator";
const updateProfileExpressValidator = [
  body("name").notEmpty().withMessage("Ad gereklidir"),
  body("email").isEmail().withMessage("Geçerli bir e-posta giriniz"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Şifre en az 6 karakter olmalıdır"),
  body("storeName").notEmpty().withMessage("Mağaza adı gereklidir"),
  body("mersisNumber").notEmpty().withMessage("Mersis numarası gereklidir"),
  body("bankAccountNumber")
    .notEmpty()
    .withMessage("Banka hesap numarası gereklidir"),
  body("bankAccountOwnerName")
    .notEmpty()
    .withMessage("Hesap sahibi adı gereklidir"),
  body("taxOffice").notEmpty().withMessage("Vergi dairesi gereklidir"),
  body("companyTitle").notEmpty().withMessage("Şirket unvanı gereklidir"),
  body("taxNumber").notEmpty().withMessage("Vergi numarası gereklidir"),
  body("companyType").notEmpty().withMessage("Şirket türü gereklidir"),
  body("number")
    .isMobilePhone("tr-TR")
    .withMessage("Geçerli bir TR telefon numarası giriniz "),
];
export default updateProfileExpressValidator;
