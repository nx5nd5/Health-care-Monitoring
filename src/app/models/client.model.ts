export class Client {
    id: number;
    mac: string;
    nom: string;
    prenom: string;
    tel: string;
    adresse: string;
    mail: string;
    blood: string;
    sex:string;
    age:number;
    weight:number;


    constructor(
        id: number = 0,
        mac: string = '',
        nom: string = '',
        prenom: string = '',
        tel: string = '',
        adresse: string = '',
        mail: string = '',
        blood: string='',
        sex:string='',
        age:number=0,
        weight:number=0,
    ) {
        this.id = id;
        this.mac = mac;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel;
        this.adresse = adresse;
        this.mail = mail;
        this.blood = blood;
        this.sex = sex;
        this.age = age;
        this.weight = weight;

    }
}