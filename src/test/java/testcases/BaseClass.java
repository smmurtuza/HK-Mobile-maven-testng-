package testcases;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.remote.MobileCapabilityType;

public class BaseClass {
	static AppiumDriver driver;

	//@SuppressWarnings("deprecation")
	@BeforeTest
	public void setup() {
	    try {
	        DesiredCapabilities dc = new DesiredCapabilities();
	        dc.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
	        dc.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
	        //dc.setCapability(MobileCapabilityType.PLATFORM_VERSION, "11"); // Updated to reflect actual device OS version
            dc.setCapability(MobileCapabilityType.DEVICE_NAME, "emulator-5554");
            //dc.setCapability(MobileCapabilityType.DEVICE_NAME, "Redmi 9");
	        //dc.setCapability(MobileCapabilityType.UDID, "97a606d80406");
	        dc.setCapability("appPackage", "com.jbs.hk.c");
	        dc.setCapability("appActivity", "com.jbs.hk.c.activity.SplashActivity");
	        //dc.setCapability(MobileCapabilityType.APP, "C:\\Users\\HK\\Downloads\\murtuza.apk");
	        dc.setCapability("appium:adbExecTimeout", 60000);
	        dc.setCapability("appium:newCommandTimeout", 60000);

	        URL url = new URL("http://127.0.0.1:4723/wd/hub");
	        driver = new AppiumDriver(url, dc);
	         Thread.sleep(5000);

	        System.out.println("Setup completed successfully.");

	    } catch (Exception e) {
	        System.err.println("Failed to set up the Appium driver: " + e.getMessage());
	        e.printStackTrace();
	    }
	}

	
	@Test
	public void sampleTest() {
	    try {
	        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

	        WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.TextView")));
	        nextButton.click();

	        WebElement Chkbox = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/cb_agree")));
	        Chkbox.click();

	        WebElement gmail = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_sign_up")));
	        gmail.click();

//	        WebElement gmailid = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[3]/android.widget.LinearLayout")));
//	        gmailid.click();
	        
            //WebElement gmailid = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='hysabkytab1@gmail.com']")));
            //gmailid.click();
            
            //WebElement Addnew_account = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='Add another account']")));
            //Addnew_account.click();
            
         // Check if the Gmail ID is clickable and click it
            WebElement gmailid = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='abcd@gmail.com']")));
            if (gmailid != null) {
                gmailid.click();
                System.out.println("Gmail ID element is clickable");
            } else {
                // Handle the case where the element is not clickable or not found
            	WebElement Addnew_account = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='Add another account']")));
                Addnew_account.click();
                
                WebElement enter_gmailid = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.view.View[1]/android.widget.TextView[2]")));
                enter_gmailid.click();
                
                WebElement Name = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("com.jbs.hk.c:id/et_name")));
    	        Name.sendKeys("invision.murtuza@gmail.com");
                
                WebElement Next = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='Next']")));
                Next.click();
                
                WebElement password = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button")));
    	        password.sendKeys("03433805340Pakistan@321");
    	        
    	        WebElement Next_pass = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='Next']")));
    	        Next_pass.click();
    	        
    	        WebElement SAVE = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='SAVE']")));
    	        SAVE.click();
    	        
    	        WebElement SKIP = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='SKIP']")));
    	        SKIP.click();
    	        WebElement agree = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//android.widget.TextView[@text='I agree']")));
    	        agree.click();
    	        
                Next.click();
                
            }
            

	        WebElement Name = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("com.jbs.hk.c:id/et_name")));
	        Name.sendKeys("SMMR");

	        WebElement DOB = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/et_dob")));
	        DOB.click();

	        WebElement DOB1 = wait.until(ExpectedConditions.elementToBeClickable(By.id("android:id/button1")));
	        DOB1.click();

	        WebElement gender = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.LinearLayout[3]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView")));
	        gender.click();

	        WebElement Cont = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_next")));
	        Cont.click();

	        WebElement prof_user = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]/android.widget.ImageView")));
	        prof_user.click();

	        WebElement Cont1 = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_next")));
	        Cont1.click();

	        WebElement Cont2 = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/tv_continue")));
	        Cont2.click();

	        WebElement restore = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_restore")));
	        restore.click();

	        WebElement restore1 = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_restore")));
	        restore1.click();

	        WebElement switch_location = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/switch_location")));
	        switch_location.click();

	        WebElement switch_location2 = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.android.permissioncontroller:id/permission_allow_foreground_only_button")));
	        switch_location2.click();

	        WebElement cont3 = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_next")));
	        cont3.click();

	        WebElement home_skip = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/plus_expense")));
	        home_skip.click();

	        // Pause to observe the result
	        Thread.sleep(10000);

	        System.out.print("I am murtuza");
	    } catch (Exception e) {
	        e.printStackTrace(); // Here, you catch any exceptions thrown during the test execution.
	    }
	}

	
	@AfterTest
	public void teardown() {
//		if (driver != null) {
//	        driver.quit();
//	    }
		if (driver != null) {
            try {
                driver.quit();
            } catch (WebDriverException e) {
                System.err.println("Failed to quit the driver: " + e.getMessage());
            }
		}
		
	}
}
