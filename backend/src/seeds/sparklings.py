from src.models.product import ProductIn, TypeEnum


# doing ..
sparklings: list[ProductIn] = [
    ProductIn(
        name="Espumante Aurora Pinto Bandeira Extra Brut",
        description="""O espumante Aurora Pinto Bandeira Extra Brut é feito com o corte perfeito entre Chardonnay,
                         Pinot Noir e Riesling Itálico, harmonizando o clássico com o inovador. Esse corte proporcionara
                        uma bebida única, de coloração amarelo palha e cremosidade singular. Após amadurecer por 12 meses 
                        em contato com as leveduras, esse espumante possui aromas que remetem à doçura de damascos e a robustez 
                        de amêndoas tostadas. Toques elegantes de flores como a laranjeira se destacam, acompanhando seu 
                        paladar de delicada acidez.
                        Este espumante é elaborado pelo método tradicional, em um terroir mundialmente 
                        reconhecido com I.P Altos de Pinto Bandeira.""",
        alcohol_content=13,
        brand="Aurora",
        ibu=0.0,
        price=100,
        type=TypeEnum.sparkling,
        disponible=True,
        source="http://127.0.0.1:8080/src/static/sparkling_autora_pinto_bandeira.png",
        quantity=10,
        volume=750,
    ),
]
